// Implements the CommentController class which handles the comment routes

import { Request, Response } from "express";
import { Comment } from "../models/comments/Comment";
import { CommentService } from "../services/CommentService";

export class CommentController {
  private static commentService: CommentService = CommentService.getInstance();

  public static getComments = async (req: Request, res: Response) => {
    const comments: Comment[] =
      await CommentController.commentService.getComments();
    res.status(200).send(comments);
  };

  public static addComment = async (req: Request, res: Response) => {
    const comment: Comment = req.body;
    const addedComment: Comment =
      await CommentController.commentService.addComment(comment);
    res.status(200).send(addedComment);
  };

  public static updateComment = async (req: Request, res: Response) => {
    const comment: Comment = req.body;
    const updatedComment: Comment =
      await CommentController.commentService.updateComment(comment);
    res.status(200).send(updatedComment);
  };

  public static deleteComment = async (req: Request, res: Response) => {
    const commentId: string = req.params.id;
    await CommentController.commentService.deleteComment(commentId);
    res.status(200).send();
  };
}
