// Define the interface for the CommentController

// Path: src/interfaces/CommentControllerI.ts
export interface CommentControllerI {
  getComments: (req: Request, res: Response) => Promise<void>;
  addComment: (req: Request, res: Response) => Promise<void>;
  updateComment: (req: Request, res: Response) => Promise<void>;
  deleteComment: (req: Request, res: Response) => Promise<void>;
}
