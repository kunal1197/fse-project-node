import User from "../users/User";

export default interface LikeI {
    likedBy: User;
    song: string;
}