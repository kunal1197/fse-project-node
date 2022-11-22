import User from "../user/User";
import DisLikeI from "./dislikesI";

export default class DisLike implements DisLikeI {
  private id: string = "";
  dislikedBy: User;
  song: string;
  constructor(id: string, song: string, dislikedBy: User) {
    this.id = id;
    this.dislikedBy = dislikedBy;
    this.song = song;
  }
}
