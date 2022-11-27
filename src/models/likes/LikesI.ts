/**
 * @file Declares LikeI data type representing relationship between
 * users and tuits, as in user likes a tuit
 */
import User from "../users/User";

/**
 * @typedef LikeI Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {string} song Tuit being liked
 * @property {User} likedBy User liking the tuit
 */

export default interface LikeI {
  song: string;
  likedBy: User;
}
