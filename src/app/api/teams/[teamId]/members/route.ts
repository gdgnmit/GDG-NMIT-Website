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
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const name = formData.get("name") as string | null;
    const role = formData.get("role") as string | null;
    const domain = formData.get("domain") as string | null;
    const tier = formData.get("tier") as string | null;
    const photo = formData.get("photo") as File | null;

    if (!name || !role || !domain || !tier) {
      return NextResponse.json(
        { error: "Name, role, domain, and tier are required" },
        { status: 400 }
      );
    }

    const validDomains = [
      'club', 'tech', 'design', 'content and documentation',
      'pr & marketing', 'social media', 'operations'
    ];

    if (!validDomains.includes(domain)) {
      return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
    }

    if (domain !== 'club') {
      const validTiers = [
        'faculty coordinator', 'lead', 'co-lead', 'student-advisor',
        'mentor', 'core', 'member', 'past', 'recruit'
      ];

      if (!validTiers.includes(tier)) {
        return NextResponse.json({ error: "Invalid tier for this domain" }, { status: 400 });
      }
    }

    let photoUrl = "";
    if (photo && photo.size > 0) {
      try {
        const arrayBuffer = await photo.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        photoUrl = await new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "member_photos" },
            (error, result) => {
              if (error) reject(error);
              else if (result?.secure_url) resolve(result.secure_url);
              else reject(new Error("No URL from Cloudinary"));
            }
          );
          stream.end(buffer);
        });
      } catch (uploadError) {
        return NextResponse.json({ error: "Photo upload failed" }, { status: 500 });
      }
    }

    const newMember = {
      name,
      role,
      domain,
      tier,
      photoUrl,
      teamId: teamObjectId
    };

    const result = await members.insertOne(newMember);
    await teams.updateOne(
      { _id: teamObjectId },
      { $addToSet: { members: result.insertedId } }
    );


    return NextResponse.json({
      message: "Member added successfully",
      insertedId: result.insertedId,
      photoUrl
    });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
