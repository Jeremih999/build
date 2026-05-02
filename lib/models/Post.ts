import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  excerpt: string;
  category: "sports" | "fashion" | "entertainment" | "business";
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["sports", "fashion", "entertainment", "business"],
    },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
