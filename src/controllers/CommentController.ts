// Implements the CommentController class which handles the comment routes

import { Express, Request, Response } from "express";
import CommentDao from "../daos/CommentDao";
import { CommentControllerI } from "../interfaces/CommentControllerI";

export class CommentController implements CommentControllerI {
  private static commentDao: CommentDao = CommentDao.getInstance();
  private static commentController: CommentController | null = null;

  /**
   * Creates singleton CommentController instance
   * @returns CommentController
   * @throws {Error} If CommentController instance already exists
   * @throws {Error} If CommentDao instance does not exist
   */
  public static getInstance = (app: Express): CommentController => {
    if (CommentController.commentController === null) {
      CommentController.commentController = new CommentController();
      app.get(
        "/api/comments/:sid",
        CommentController.commentController.getComments
      );
      app.post(
        "/api/comments/:uid/song/:sid",
        CommentController.commentController.addComment
      );
      app.put(
        "/api/comments/:uid/song/:sid",
        CommentController.commentController.updateComment
      );
      app.delete(
        "/api/comments/:uid/song/:sid",
        CommentController.commentController.deleteComment
      );
    }
    return CommentController.commentController;
  };

  private constructor() {}

  /**
   * Retrieves all comments for a tuit.
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns {void}
   * @throws {Error} If the tuit does not exist.
   */
  getComments: (req: Request, res: Response) => void = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const comments = await CommentController.commentDao.getComments(
        req.params.sid
      );
      res.status(200).json(comments);
    } catch (err) {
      res.status(404).json({ error: "Error" });
    }
  };

  /**
   * Inserts a comment instance into the database.
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns {void}
   * @throws {Error} If the comment does not exist.
   */
  addComment: (req: Request, res: Response) => void = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const comment = await CommentController.commentDao.addComment(
        req.params.uid,
        req.params.sid,
        req.body.comment
      );
      res.status(200).json(comment);
    } catch (err) {
      res.status(404).json({ error: "Error" });
    }
  };

  /**
   * Updates a comment instance in the database.
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns {void}
   * @throws {Error} If the comment does not exist.
   */
  updateComment: (req: Request, res: Response) => void = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const comment = await CommentController.commentDao.updateComment(
        req.params.uid,
        req.params.sid,
        req.body.comment
      );
      res.status(200).json(comment);
    } catch (err) {
      res.status(404).json({ error: "Error" });
    }
  };

  /**
   * Deletes a comment instance from the database.
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns {void}
   * @throws {Error} If the comment does not exist.
   */
  deleteComment: (req: Request, res: Response) => void = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const comment = await CommentController.commentDao.deleteComment(
        req.params.uid,
        req.params.sid
      );
      res.status(200).json(comment);
    } catch (err) {
      res.status(404).json({ error: "Error" });
    }
  };
}
