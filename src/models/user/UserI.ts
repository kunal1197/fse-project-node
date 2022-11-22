import mongoose from "mongoose";

/**
 * @typedef UserI Represents a user in the tuiter application
 * @property {string} username The user's username
 * @property {string} password The user's password
 * @property {string} firstName The user's first name
 * @property {string}  lastName The user's last name
 * @property {string} email The user's email
 * @property {string} profilePhoto The user's profile photo
 */

export default interface UserI {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string | null,
    lastName?: string | null,
    profilePhoto?: string | null,
    likedSongs?: string[],
    commentedSongs?: string[],
    playlists?: string[]
} ;