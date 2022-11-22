import MusicDiscoveryServiceI from "../interfaces/MusicDiscoveryServiceI";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "../models/Track";
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
            SpotifyService.spotifyApi.clientCredentialsGrant().then(
                function(data: any) {
                    console.log('The access token is ' + data.body['access_token']);
                    // @ts-ignore
                    SpotifyService.spotifyApi.setAccessToken(data.body['access_token']);
                },
                function(err: any) {
                    console.log('Something went wrong!', err);
                }
            );
        }
        return SpotifyService.spotifyService;
    }

    searchTracks = async (query: string) => {
        // @ts-ignore
        const tracks = await SpotifyService.spotifyApi.searchTracks(query);
        const trackList:Track[] = []
        if (tracks === null || tracks.body === null || tracks.body.tracks === null)
            return []

        // @ts-ignore
        for (const item of tracks.body.tracks.items) {
            trackList.push({id: item.id, title: item.name, image: item.album.images[item.album.images.length - 1].url, releaseYear: item.album.release_date})
        }
        return trackList;
    }

}

