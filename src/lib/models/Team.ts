import mongoose, { Schema, Document } from 'mongoose';

export interface IMember {
  teamId:string,
  name: string;
  role: string;
  photoUrl: string;
}

export interface ITeam extends Document {
  year: number;
  name: string;
  members: IMember[];
}

const MemberSchema: Schema = new Schema<IMember>({
  teamId: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  photoUrl: { type: String }
});

const TeamSchema: Schema = new Schema<ITeam>({
  year: { type: Number, required: true, index: true },
  name: { type:String},
  members: { type: [MemberSchema], default: [] }
});

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
