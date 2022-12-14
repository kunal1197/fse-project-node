// Implements the CommentController class which handles the comment routes

import { Express, Request, Response } from "express";
import CommentDao from "../daos/CommentDao";
import { CommentControllerI } from "../interfaces/CommentControllerI";

export class CommentController implements CommentControllerI {
  public static commentDao: CommentDao = CommentDao.getInstance();
  public static commentController: CommentController | null = null;

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
        "/api/comments/:uid/comment/:cid",
        CommentController.commentController.updateComment
      );
      app.delete(
        "/api/comments/:uid/comment/:cid",
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
      res.status(404).json({ error: err });
    }
  };

  /**
   * Inserts a comment instance into the database.
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns {void}
   * @throws {Error} If the comment does not exist.
   */
  //  Add session variables to get uid
  addComment: (req: any, res: any) => void = async (
    req: any,
    res: any
  ): Promise<void> => {
    const uid = req.params.uid;
    const sid = req.params.sid;
    let profile = null;
    if (req.session) {
      profile = req.session["profile"];
    }
    const userId = uid === "me" && profile ? profile._id : uid;

    try {
      const comment = await CommentController.commentDao.addComment(
        userId,
        sid,
        req.body.comment
      );
      res.status(200).json(comment);
    } catch (err) {
      res.status(403).json({ error: err });
    }
  };

  /**
   * Updates a comment instance in the database.
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns {void}
   * @throws {Error} If the comment does not exist.
   */
  updateComment: (req: any, res: any) => void = async (
    req: any,
    res: any
  ): Promise<void> => {
    const uid = req.params.uid;
    const cid = req.params.cid;
    let profile = null;
    if (req.session) {
      profile = req.session["profile"];
    }
    const userId = uid === "me" && profile ? profile._id : uid;

    try {
      const comment = await CommentController.commentDao.updateComment(
        userId,
        cid,
        req.body.comment
      );
      res.status(200).json(comment);
    } catch (err) {
      res.status(403).json({ error: err });
    }
  };

  /**
   * Deletes a comment instance from the database.
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @returns {void}
   * @throws {Error} If the comment does not exist.
   */
  deleteComment: (req: any, res: any) => void = async (
    req: any,
    res: any
  ): Promise<void> => {
    const uid = req.params.uid;
    const cid = req.params.cid;
    let profile = null;
    if (req.session) {
      profile = req.session["profile"];
    }
    const userId = uid === "me" && profile ? profile._id : uid;

    try {
      const comment = await CommentController.commentDao.deleteComment(
        userId,
        cid
      );
      res.status(200).json(comment);
    } catch (err) {
      res.status(403).json({ error: err });
    }
  };
}
