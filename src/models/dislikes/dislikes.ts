import User from "../users/User";
import DisLikesI from "./dislikesI";

export default class DisLike implements DisLikesI {
  private id: string = "";
  dislikedBy: User;
  song: string;
  constructor(id: string, song: string, dislikedBy: User) {
    this.id = id;
    this.dislikedBy = dislikedBy;
    this.song = song;
  }
}
