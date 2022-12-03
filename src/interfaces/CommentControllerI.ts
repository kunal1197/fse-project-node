// Define the interface for the CommentController
import { Request, Response } from "express";
// Path: src/interfaces/CommentControllerI.ts
export interface CommentControllerI {
  getComments: (req: Request, res: Response) => void;
  addComment: (req: Request, res: Response) => void;
  updateComment: (req: Request, res: Response) => void;
  deleteComment: (req: Request, res: Response) => void;
}
