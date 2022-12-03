import Comment from "../models/comments/Comment";

export default interface CommentDaoI {
  getComments: (tid: string) => Promise<Comment[]>;
  addComment: (uid: string, tid: string, comment: string) => Promise<any>;
  updateComment: (
    uid: string,
    tid: string,
    comment: string,
    newComment: string
  ) => Promise<any>;
  deleteComment: (uid: string, tid: string, comment: string) => Promise<any>;
}
