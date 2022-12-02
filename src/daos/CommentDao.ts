// import path to CommentDaoI
import { CommentDaoI } from '../interfaces/CommentDaoI';
// import path to CommentModel
import CommentModel from '../mongoose/comments/CommentModel';
// import path to Comment
import Comment from '../models/comments/Comment';


// Path: src/daos/CommentDao.ts
export class CommentDao implements CommentDaoI {
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
    }

    private constructor() {
    }
    
    /**
     *  
     * @param {string} uid User who wishes to like a tuit.
     * @param {string} sid Song that is liked.
     * @returns Promise To be notified when a like instance in inserted into the database.
     */
    userLikesSong = async (uid: string, sid: string): Promise<any> =>
        LikeModel.create({song: sid, likedBy: uid});


    /**
     * Retrieves all comments for a song.
     * @returns Promise To be notified when the comments are retrieved from the database.
     * @param {string} sid Song for which comments are to be retrieved.
        */

    getComments = async (sid: string): Promise<Comment[]> =>

        CommentModel.find({song: sid
        }).exec();

    /**
     * Adds a comment to the database.
     * @param {Comment} comment Comment to be added to the database.
     * @returns Promise To be notified when the comment is added to the database.
     */
     
    addComment = async (comment: Comment): Promise<Comment> =>
    
            CommentModel.create(comment);

    /**
     * Updates a comment in the database.
     * @param {Comment} comment Comment to be updated in the database.
     * @returns Promise To be notified when the comment is updated in the database.
     */
    updateComment = async (comment: Comment): Promise<Comment> =>
        CommentModel.findByIdAndUpdate
        (comment._id, comment, {new: true}).exec();

    /**
     * Deletes a comment from the database.
     * @param {string} commentId Comment to be deleted from the database.
     * @returns Promise To be notified when the comment is deleted from the database.
     * @param {string} uid User who wishes to delete a comment.
     * @param {string} sid Song for which a comment is to be deleted.
     * @returns Promise To be notified when the comment is deleted from the database.
        */
    deleteComment = async (uid: string, sid: string): Promise<void> =>

        CommentModel.deleteOne({song
        : sid, commentedBy: uid}).exec();
        }





