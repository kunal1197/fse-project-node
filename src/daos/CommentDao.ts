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
   * Retrieves all comments for a song.
   * @param {string} sid song for which comments are to be retrieved.
   * @returns Promise To be notified when the comments are retrieved from the database.
   * @throws {Error} If the song does not exist.
   */
  public getComments = async (sid: string): Promise<Comment[]> => {
    const comments = await CommentModel.find({ songID: sid })
      .populate("postedBy")
      .exec();
    if (comments === null) {
      throw new Error("Comments do not exist");
    }
    return comments;
  };

  /**
   * Inserts a comment instance into the database.
   * @param {string} uid User who wishes to comment on a song.
   * @param {string} sid song that is commented on.
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
      postedBy: uid,
      songID: sid,
    });
    if (com === null) {
      throw new Error("Comment does not exist");
    }
    return com;
  };

  /**
   * Updates a comment instance in the database.
   * @param {string} uid User who wishes to update a comment.
   * @param {string} cid comment that is commented on.
   * @param {string} comment Comment that is updated.
   * @returns Promise To be notified when a comment instance in updated in the database.
   * @throws {Error} If the comment does not exist.
   * @throws {Error} If the user does not exist.
   */
  updateComment = async (
    uid: string,
    cid: string,
    comment: string
  ): Promise<any> => {
    const com = await CommentModel.updateOne(
      { postedBy: uid, _id: cid },
      { $set: { comment: comment } }
    );
    if (com === null) {
      throw new Error("Comment does not exist");
    }
    console.log(comment, com)
    return com;
  };

  /**
   * Removes a comment instance from the database.
   * @param {string} uid User who wishes to delete a comment.
   * @param {string} cid Comment that is commented on.
   * @returns Promise To be notified when a comment instance in removed from the database.
   * @throws {Error} If the comment does not exist.
   */
  deleteComment = async (uid: string, cid: string): Promise<any> => {
    const com = await CommentModel.deleteOne({
      postedBy: uid,
      _id: cid,
    });
    if (com === null) {
      throw new Error("Comment does not exist");
    }
    return com;
  };
}
