/**
 * @file Implements mongoose schema to map to a MongoDB Comments collection,
 * defines shape of the documents in comment
 */
import mongoose, { Schema } from "mongoose";
import Comment from "../../models/comments/Comment";

const CommentSchema = new mongoose.Schema<Comment>(
  {
    songID: {
      type: Schema.Types.ObjectId,
    },
    comment: {
      type: String,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
    postedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "comments" }
);

export default CommentSchema;
