import Like from "../models/likes/Like";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    /**
     * Retrieves all users that liked a song.
     * @param {string} sid Song for which users who have liked this song.
     * @returns Promise To be notified when the users who have liked the song are retrieved from the database.
     */
    findAllUsersThatLikedSong (sid: string): Promise<Like[]>;

    /**
     * Retrieves all tuits liked by a user.
     * @param {string} uid User for whom their liked songs are to be retrieved.
     * @returns Promise To be notified when the liked songs are retrieved from the database.
     */
    findAllSongsLikedByUser (uid: string): Promise<Like[]>;

    /**
     * Removes a like instance from the database.
     * @param {string} uid User who wishes to unlike a song.
     * @param {string} sid Song that is unliked.
     * @returns Promise To be notified when a like instance in removed from the database.
     */
    userUnlikesSong (sid: string, uid: string): Promise<any>;

    /**
     * Inserts a like instance into the database.
     * @param {string} uid User who wishes to like a tuit.
     * @param {string} sid Song that is liked.
     * @returns Promise To be notified when a like instance in inserted into the database.
     */
    userLikesSong (sid: string, uid: string): Promise<Like>;
};