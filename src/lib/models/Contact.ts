import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String ,required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact ||
  mongoose.model<IContact>('Contact', ContactSchema);

