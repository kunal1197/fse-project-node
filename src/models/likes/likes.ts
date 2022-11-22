import User from "../users/User";
import LikeI from "./likesI";

export default class Like implements LikeI {
  private id: string = "";
  likedBy: User;
  song: string;
  constructor(id: string, song: string, likedBy: User) {
    this.id = id;
    this.likedBy = likedBy;
    this.song = song;
  }
}
