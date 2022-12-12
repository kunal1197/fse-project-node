/**
 * @file Declares RESTful Web service API for like resource for songs.
 */
import {Request, Response} from "express";

export default interface LikeControllerI {
    /**
     * Retrieves all users that liked a song from the database
     * @param {Request} req Represents request from client, including the path
     * parameter sid representing the liked song
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedSong (req: Request, res: Response): void;

    /**
     * Retrieves all songs liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the songs
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the song objects that were liked
     */
    findAllSongsLikedByUser (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and sid representing the user that is liking the song
     * and the song being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new like that was inserted in the
     * database
     */
    userLikesSong (req: Request, res: Response): void;

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and sid representing the user that is unliking
     * the song and the song being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesSong (req: Request, res: Response): void;
};