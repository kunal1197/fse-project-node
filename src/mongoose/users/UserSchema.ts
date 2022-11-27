import mongoose from "mongoose";
import User from "../../models/users/User";

const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    likedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }],
    commentedSongs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }],
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
    }],
}, {collection: 'users'});

export default UserSchema;