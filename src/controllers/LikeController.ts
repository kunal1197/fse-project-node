/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI"

/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): LikeController => {
        if(LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllSongsLikedByUser);
            app.get("/api/songs/:sid/likes", LikeController.likeController.findAllUsersThatLikedSong);
            app.get("/api/users/:uid/likes/:sid", LikeController.likeController.findUserLikesSong);
            app.get("/api/songs/:sid/likesCount", LikeController.likeController.countHowManyLikes);
            app.post("/api/users/:uid/likes/:sid", LikeController.likeController.userLikesSong);
            app.put("/api/users/:uid/likes/:sid", LikeController.likeController.userTogglesSongLikes);
            app.delete("/api/users/:uid/unlikes/:sid", LikeController.likeController.userUnlikesSong);
        }
        return LikeController.likeController;
    }

    private constructor() {}

    /**
     * Retrieves all users that liked a song from the database
     * @param {Request} req Represents request from client, including the path
     * parameter sid representing the liked song
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedSong = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedSong(req.params.sid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all songs liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllSongsLikedByUser = (req: any, res: any) => {
        const uid = req.params.uid;
        let profile;
        if (req.session) {
            profile = req.session['profile'];
        } else {
            profile = null;
        }
        const userId = uid === "me" && profile ?
            profile._id : uid;

        if (userId === "me") {
            res.json([])
            return
        }

        LikeController.likeDao.findAllSongsLikedByUser(userId)
            .then(likes => {
                const likesNonNullTuits =
                    likes.filter(like => like.song);
                const tuitsFromLikes =
                    likesNonNullTuits.map(like => like.song);
                res.json(tuitsFromLikes);
            });
    }

    /**
     * Retrieves users that liked a song from the database
     * @param {Request} req Represents request from client, including the path
     * parameter sid and uid representing the liked song and user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUserLikesSong = (req: any, res: any) => {
        const uid = req.params.uid;
        let profile;
        if (req.session) {
            profile = req.session['profile'];
        } else {
            profile = null;
        }
        const userId = uid === "me" && profile ? profile._id : uid;

        LikeController.likeDao.findUserLikesSong(userId, req.params.sid)
            .then(likes => res.json(likes));
    }

    /**
     * Retrieves number of users that liked a song from the database
     * @param {Request} req Represents request from client, including the path
     * parameter sid representing the liked song
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    countHowManyLikes = (req: any, res: any) =>
        LikeController.likeDao.countHowManyLikes(req.params.sid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesSong = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesSong(req.params.uid, req.params.sid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and sid representing the user that is unliking
     * the song and the song being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesSong = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesSong(req.params.uid, req.params.sid)
            .then(status => res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and sid representing the user that is liking or unliking a song
     * @param {Response} res Represents response to client, including status
     * on whether the song was liked or unliked
     */
    userTogglesSongLikes = async (req: any, res: any) => {
        const uid = req.params.uid;
        const sid = req.params.sid;
        let songLiked = false;
        let profile = null;
        if (req.session) {
            profile = req.session['profile'];
        }
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikeController.likeDao
                .findUserLikesSong(userId, sid);
            if (userAlreadyLikedTuit) {
                await LikeController.likeDao.userUnlikesSong(userId, sid);
                songLiked = false
            } else {
                await LikeController.likeDao.userLikesSong(userId, sid);
                songLiked = true
            }
            const howManyLikedSong = await LikeController.likeDao.countHowManyLikes(sid)
            res.status(200).json({count: howManyLikedSong, userLiked: songLiked});
        } catch (e) {
            res.sendStatus(404);
        }
    }

};