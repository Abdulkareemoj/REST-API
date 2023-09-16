import mongoose from "npm:mongoose@^6.7";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  timestamps: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true },
);

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;
