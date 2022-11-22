/**
 * @file Declares DisLikeI data type representing relationship between
 * users and tuits, as in user dislikes a tuit
 */
import User from "../users/User";

/**
 * @typedef LikeI Represents dislikes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {string} song Tuit being disliked
 * @property {User} dislikedBy User disliking the tuit
 */

export default interface LikeI {
  song: string;
  dislikedBy: User;
}
