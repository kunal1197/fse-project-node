// Define the interface for the CommentDao

// Path: src/interfaces/CommentDaoI.ts
export interface CommentDaoI {
  getComments: () => Promise<Comment[]>;
  addComment: (comment: Comment) => Promise<Comment>;
  updateComment: (comment: Comment) => Promise<Comment>;
  deleteComment: (commentId: string) => Promise<void>;
}
