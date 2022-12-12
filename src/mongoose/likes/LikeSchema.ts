import mongoose, { Schema } from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like represents the likes in the tuiter application
 * @property {Object} tuit The tuit that was liked
 * @property {Object} likedBy The user who liked the tuit
 */
const LikeSchema = new mongoose.Schema<Like>(
  {
    song: { type: String, required: true },
    likedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "likes" }
);
export default LikeSchema;
