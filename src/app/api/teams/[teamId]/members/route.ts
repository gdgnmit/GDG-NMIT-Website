import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../lib/mongodb";
import cloudinary from "../../../../../lib/cloudinary";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await context.params;

    if (!ObjectId.isValid(teamId)) {
      return NextResponse.json({ error: "Invalid teamId" }, { status: 400 });
    }

    const teamObjectId = new ObjectId(teamId);
    const { client } = await connectToDatabase();
    const db = client.db();

    const teams = db.collection("teams");
    const members = db.collection("members");

    const team = await teams.findOne({ _id: teamObjectId });
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (formDataError) {
      console.error("Failed to parse formData:", formDataError);
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const keys = Array.from(formData.keys());

    const allowedPhotoKey = "photo";
    const invalidPhotoKey = keys.some(
      (key) => key.startsWith("photo") && key !== allowedPhotoKey
    );

    if (invalidPhotoKey) {
      return NextResponse.json(
        {
          error: `Invalid file upload key detected. Please use '${allowedPhotoKey}' as the key for uploading photo.`,
        },
        { status: 400 }
      );
    }

    const name = formData.get("name") as string | null;
    const role = formData.get("role") as string | null;
    const photo = formData.get("photo") as File | null;

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name and role are required" },
        { status: 400 }
      );
    }

    let photoUrl = "";
    if (photo && photo.size > 0) {
      try {
        const arrayBuffer = await photo.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log("Uploading file to Cloudinary...");
        photoUrl = await new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "member_photos" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
                return;
              }
              if (!result || !result.secure_url) {
                reject(new Error("No valid upload response from Cloudinary"));
                return;
              }
              console.log("Cloudinary upload successful:", result.secure_url);
              resolve(result.secure_url);
            }
          );
          stream.end(buffer);
        });
      } catch (uploadError) {
        console.error("Error during Cloudinary upload:", uploadError);
        return NextResponse.json(
          { error: "Photo upload failed. Try again later." },
          { status: 500 }
        );
      }
    } else {
      console.log("No photo file uploaded");
    }

    const newMember = {
      name,
      role,
      photoUrl,
      teamId: teamObjectId,
    };

    let result;
    try {
      result = await members.insertOne(newMember);
      console.log("Inserted member with ID:", result.insertedId);
    } catch (dbError) {
      console.error("Failed to insert member in DB:", dbError);
      return NextResponse.json(
        { error: "Failed to save member data" },
        { status: 500 }
      );
    }
   
    const updateResult = await teams.updateOne(
      { _id: teamObjectId },
      { $addToSet: { members: result.insertedId } }
    );

    if (updateResult.modifiedCount === 0) {
      console.warn("Member ID was already present in the team's members array.");
    }

    return NextResponse.json({
      message: "Member added successfully and team updated",
      insertedId: result.insertedId,
      photoUrl,
    });
  } catch (error) {
    console.error("Unexpected error in POST /api/teams/[teamId]/members:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
