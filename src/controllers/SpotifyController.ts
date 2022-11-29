/**
 * @file Controller RESTful Web service API for spotify music discovery resource
 */
import MusicDiscoveryControllerI from "../interfaces/MusicDiscoveryControllerI";
import {Express, Request, Response} from "express";
import SpotifyService from "../services/SpotifyService";

/**
 * @class SpotifyController Implements RESTful Web service API for the music discovery resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/music/search/?q=<query> to retrieve all the tracks that match the search query
 *     </li>
 * </ul>
 * @property {SpotifyService} spotifyService Singleton service implementing music discovery logic from
 * the Spotify API.
 * @property {SpotifyController} spotifyController Singleton controller implementing
 * RESTful Web service API
 */
export default class SpotifyController implements MusicDiscoveryControllerI {

    private static spotifyController: SpotifyController | null = null;
    private static spotifyService: SpotifyService = SpotifyService.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return SpotifyController
     */
    public static getInstance = (app: Express): SpotifyController => {
        if(SpotifyController.spotifyController === null) {
            SpotifyController.spotifyController = new SpotifyController();
            app.get("/api/music/search/", SpotifyController.spotifyController.searchTracks);
        }
        return SpotifyController.spotifyController;
    }

    private constructor() {

    }

    /**
     * Retrieves all music tracks based on the search query param 'q'.
     * @param {Request} req Represents request from client, including the query
     * parameter 'q' representing the search query.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the music track objects
     */
    searchTracks = (req: Request, res: Response) => {
        if (!req.query.q || !req.query.q.toString().length) {
            res.send([])
            return
        }
        const searchQuery = req.query.q.toString();
        SpotifyController.spotifyService.searchTracks(searchQuery)
            .then(tracks => res.json(tracks))
            .catch(err => res.json(err))
    }


}