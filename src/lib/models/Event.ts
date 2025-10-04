import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description?: string;
  date: Date;
  venue?: string;
}

const EventSchema: Schema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  venue: { type: String }
});

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
