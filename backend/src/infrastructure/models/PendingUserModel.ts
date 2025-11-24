import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "@domain/entities/User";

export interface PendingUserDocument extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  passwordHash: string;
  role: UserRole;
  otpHash: string;
  otpExpiresAt: Date;
  createdAt: Date;
}

const PendingUserSchema: Schema<PendingUserDocument> = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.USER
    },
    otpHash: { type: String, required: true },
    otpExpiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const PendingUserModel = mongoose.model<PendingUserDocument>(
  "PendingUser",
  PendingUserSchema
);

