import CommentDaoI from "../interfaces/CommentDaoI";
import CommentModel from "../mongoose/comments/CommentModel";
import Comment from "../models/comments/Comment";

/**
 * @class CommentDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {CommentDao} commentDao Private single instance of CommentDao
 * @property {CommentModel} commentModel Private single instance of CommentModel
 */
export default class CommentDao implements CommentDaoI {
  private static commentDao: CommentDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns CommentDao
   */
  public static getInstance = (): CommentDao => {
    if (CommentDao.commentDao === null) {
      CommentDao.commentDao = new CommentDao();
    }
    return CommentDao.commentDao;
  };

  private constructor() {}

  /**
   * Retrieves all comments for a tuit.
   * @param {string} sid Tuit for which comments are to be retrieved.
   * @returns Promise To be notified when the comments are retrieved from the database.
   * @throws {Error} If the song does not exist.
   */
  getComments = async (sid: string): Promise<Comment[]> => {
    const comment = await CommentModel.find({ comment: sid }).exec();
    if (comment === null) {
      throw new Error("Tuit does not exist");
    }
    return comment;
  };

  /**
   * Inserts a comment instance into the database.
   * @param {string} uid User who wishes to comment on a tuit.
   * @param {string} sid Tuit that is commented on.
   * @param {string} comment Comment that is added.
   * @returns Promise To be notified when a comment instance in inserted into the database.
   * @throws {Error} If the comment does not exist.
   * @throws {Error} If the user does not exist.
   */
  addComment = async (
    uid: string,
    sid: string,
    comment: string
  ): Promise<any> => {
    const com = await CommentModel.create({
      comment: comment,
      commentedBy: uid,
      song: sid,
    });
    if (com === null) {
      throw new Error("Comment does not exist");
    }
    return com;
  };

  /**
   * Updates a comment instance in the database.
   * @param {string} uid User who wishes to update a comment.
   * @param {string} tid Tuit that is commented on.
   * @param {string} comment Comment that is updated.
   * @returns Promise To be notified when a comment instance in updated in the database.
   * @throws {Error} If the comment does not exist.
   * @throws {Error} If the user does not exist.
   */
  updateComment = async (
    uid: string,
    tid: string,
    comment: string
  ): Promise<any> => {
    const com = await CommentModel.updateOne({
      comment: comment,
      commentedBy: uid,
      tuit: tid,
    });
    if (com === null) {
      throw new Error("Comment does not exist");
    }
    return com;
  };

  /**
   * Removes a comment instance from the database.
   * @param {string} uid User who wishes to delete a comment.
   * @param {string} sid Tuit that is commented on.
   * @param {string} comment Comment that is deleted.
   * @returns Promise To be notified when a comment instance in removed from the database.
   * @throws {Error} If the comment does not exist.
   */
  deleteComment = async (uid: string, sid: string): Promise<any> => {
    const com = await CommentModel.deleteOne({
      commentedBy: uid,
      song: sid,
    });
    if (com === null) {
      throw new Error("Comment does not exist");
    }
    return com;
  };
}
