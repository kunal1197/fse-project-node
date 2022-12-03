/**
 * @file Declares Spotify music discovery service.
 */
import MusicDiscoveryServiceI from "../interfaces/MusicDiscoveryServiceI";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "../models/tracks/Track";

// TODO: Remove this from here.
const dotenv = require('dotenv');
dotenv.config();

export default class SpotifyService implements MusicDiscoveryServiceI {

    private static spotifyService: SpotifyService | null = null;
    private static spotifyApi: SpotifyWebApi | null = null;

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
            const response = await SpotifyService.spotifyApi?.searchTracks(query);
            const trackList:Track[] = []
            // @ts-ignore
            if (response === null || response.body === null || response.body.tracks === null)
                return []


            // @ts-ignore
            for (const item of response.body.tracks.items) {
                let artistList = [];
                for (const artistObject of item.artists) {
                    artistList.push(artistObject.name);
                }
                let imageList = []
                for (const imageObject of item.album.images) {
                    imageList.push(imageObject.url)
                }
                const track = new Track(item.id,artistList,imageList,item.album.release_date,item.duration_ms,item.external_urls.spotify,item.name)
                trackList.push(track);
            }
            return trackList;
        } catch (e) {
            console.log('Before handleError call');
            await SpotifyService.spotifyService?.handleError(e);
            console.log('After handleError call');
            throw e;
        }
    }

    handleError = async (error: any) => {
        if (error === null) {
            return;
        }
        console.debug(error);
        if (error.statusCode === 401) {
            console.log('Before setAccessToken is called of service');
            await SpotifyService.spotifyService?.setAccessToken();
            console.log('After setAccessToken is called of service');
        }
    }

    setAccessToken = async () => {
        console.log('Before clientCredentialsGrant is called of spotify');
        // @ts-ignore
        const response = await SpotifyService.spotifyApi.clientCredentialsGrant();
        console.log('After clientCredentialsGrant is called of spotify');
        if (response.statusCode === 200) {
            console.log('Before setAccessToken is called of spotifyApi');
            SpotifyService.spotifyApi?.setAccessToken(response.body['access_token']);
            console.log('After setAccessToken is called of spotifyApi');
        } else {
            console.log("Error setting access token.", response.body);
        }
    }

}

