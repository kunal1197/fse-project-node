/**
 * @file Declares Spotify music discovery service.
 */
import MusicDiscoveryServiceI from "../interfaces/MusicDiscoveryServiceI";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "../models/Track";

// TODO: Remove this from here.
const dotenv = require('dotenv');
dotenv.config();

export default class SpotifyService implements MusicDiscoveryServiceI {

    private static spotifyService: SpotifyService | null = null;
    private static spotifyApi: SpotifyWebApi | null = null;
    private static toggle: boolean = true;

    public static getInstance = (): SpotifyService => {
        if (SpotifyService.spotifyService === null) {
            SpotifyService.spotifyService = new SpotifyService();
            SpotifyService.spotifyApi = new SpotifyWebApi({
                clientId: process.env.SPOTIFY_CLIENT_ID,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
                redirectUri: process.env.SPOTIFY_REDIRECT_URI
            })
            SpotifyService.spotifyService?.setAccessToken();
        }
        return SpotifyService.spotifyService;
    }

    /**
     * Uses Spotify to fetch tracks that match a search query.
     * @param query A string that contains the search query. Can be the title or the artist name.
     */
    searchTracks = async (query: string) => {
        try {
            const tracks = await SpotifyService.spotifyApi?.searchTracks(query);
            const trackList:Track[] = []
            // @ts-ignore
            if (tracks === null || tracks.body === null || tracks.body.tracks === null)
                return []

            // @ts-ignore
            for (const item of tracks.body.tracks.items) {
                trackList.push({id: item.id, title: item.name, image: item.album.images[item.album.images.length - 1].url, releaseYear: item.album.release_date})
            }
            return trackList;
        } catch (e) {
            SpotifyService.spotifyService?.handleError(e);
            throw e;
        }
    }

    handleError = (error: any) => {
        if (error === null) {
            return;
        }
        console.debug(error);
        if (error.statusCode === 401) {
            SpotifyService.spotifyService?.setAccessToken();
        }
    }

    setAccessToken = async () => {
        if (SpotifyService.toggle) {
            SpotifyService.spotifyApi?.setAccessToken("bad token");
            SpotifyService.toggle = !SpotifyService.toggle;
        } else {
            // @ts-ignore
            const response = await SpotifyService.spotifyApi.clientCredentialsGrant();
            if (response.statusCode === 200) {
                SpotifyService.spotifyApi?.setAccessToken(response.body['access_token']);
            } else {
                console.log("Error setting access token.", response.body);
            }
        }
    }

}

