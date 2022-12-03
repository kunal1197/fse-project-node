// Implements the CommentController class which handles the comment routes

import { Express, Request, Response } from "express";
import CommentDao from "../daos/CommentDao";
import { CommentControllerI } from "../interfaces/CommentControllerI";

export class CommentController implements CommentControllerI {
  private static commentDao: CommentDao = CommentDao.getInstance();
  private static commentController: CommentController | null = null;

  getComments: (req: Request, res: Response) => {};
  addComment: (req: Request, res: Response) => {};
  updateComment: (req: Request, res: Response) => {};
  deleteComment: (req: Request, res: Response) => {};
}
