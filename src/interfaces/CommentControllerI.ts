import { Request, Response } from "express";

export interface CommentControllerI {
  getComments: (req: Request, res: Response) => void;
  addComment: (req: Request, res: Response) => void;
  updateComment: (req: Request, res: Response) => void;
  deleteComment: (req: Request, res: Response) => void;
}
