import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,   lastName: String,     
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    },
    likedSongs: [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    commentedSongs: [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref: "Playlist"}],
}, {collection: 'users'});
export default UserSchema;