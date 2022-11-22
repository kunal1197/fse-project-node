import MusicDiscoveryControllerI from "../interfaces/MusicDiscoveryControllerI";
import {Express, Request, Response} from "express";
import SpotifyService from "../services/SpotifyService";

export default class SpotifyController implements MusicDiscoveryControllerI {

    private static spotifyController: SpotifyController | null = null;
    private static spotifyService: SpotifyService = SpotifyService.getInstance();

    public static getInstance = (app: Express): SpotifyController => {
        if(SpotifyController.spotifyController === null) {
            SpotifyController.spotifyController = new SpotifyController();
            app.get("/api/music/search/", SpotifyController.spotifyController.searchTracks);
        }
        return SpotifyController.spotifyController;
    }

    private constructor() {

    }

    searchTracks = (req: Request, res: Response) => {
        if (!req.query.q || !req.query.q.toString().length) {
            res.send([])
            return
        }
        const searchQuery = req.query.q.toString();
        SpotifyController.spotifyService.searchTracks(searchQuery).then(tracks => res.json(tracks))
    }


}