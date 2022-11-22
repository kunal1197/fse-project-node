import mongoose, { Schema } from "mongoose";
import DisLikeI from "../../models/dislikes/dislikesI";

/**
 * @typedef Like represents the likes in the tuiter application
 * @property {String} song The tuit that was liked
 * @property {Object} likedBy The user who liked the tuit
 */
const DislikeSchema = new mongoose.Schema<DisLikeI>(
  {
    song: { type: String, required: true },
    dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "dislikes" }
);
export default DislikeSchema;
