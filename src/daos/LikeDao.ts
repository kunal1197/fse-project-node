/**
 * @file Implements DAO managing data storage of likes. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that liked a tuit.
     * @param {string} sid Song for which users who have liked this song.
     * @returns Promise To be notified when the users who have liked the song are retrieved from the database.
     */
    findAllUsersThatLikedSong = async (sid: string): Promise<Like[]> =>
        LikeModel.find({song: sid}).exec();

    /**
     * Retrieves all tuits liked by a user.
     * @param {string} uid User for whom their liked tuits are to be retrieved.
     * @returns Promise To be notified when the liked tuits are retrieved from the database.
     */
    findAllSongsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel.find({likedBy: uid}).exec();



    /**
     * Inserts a like instance into the database.
     * @param {string} uid User who wishes to like a tuit.
     * @param {string} sid Song that is liked.
     * @returns Promise To be notified when a like instance in inserted into the database.
     */
    userLikesSong = async (uid: string, sid: string): Promise<any> =>
        LikeModel.create({song: sid, likedBy: uid});

    /**
     * Removes a like instance from the database.
     * @param {string} uid User who wishes to unlike a song.
     * @param {string} sid Song that is unliked.
     * @returns Promise To be notified when a like instance in removed from the database.
     */
    userUnlikesSong = async (uid: string, sid: string): Promise<any> =>
        LikeModel.deleteOne({song: sid, likedBy: uid});

    /**
     * Counts how many likes are there for a song from the database.
     * @param {string} sid Song whose likes are to be counted.
     * @returns Promise To be notified when the count is returned.
     */
    countHowManyLikes = async (sid: any) =>
        LikeModel.count({song: sid});

    /**
     * Finds if user has liked a song from the database.
     * @param {string} uid User
     * @param {string} sid Song .
     * @returns Promise To be notified if user has liked a song.
     */
    findUserLikesSong = async (uid: string, sid: string) =>
        LikeModel.findOne(
            {song: sid, likedBy: uid});

}