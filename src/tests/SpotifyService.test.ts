import SpotifyService from "../services/SpotifyService";



describe('testing spotify service', () => {
    let spotifyServiceInstance = SpotifyService.getInstance()

    beforeAll( () =>  {
        spotifyServiceInstance = SpotifyService.getInstance();
    });

    test('empty query should return empty list', async () => {
        // SpotifyService.getInstance() makes a network call and sets the Spotify API auth token.
        // Its called whenever the server starts. Here, the server isn't started and thus some delay
        // is necessary before any Spotify requests are made.
        setTimeout(async () => {
            const tracks = await spotifyServiceInstance.searchTracks('');
            expect(tracks).toBe([]);
        }, 2000);
    })

    test('valid query returns a list of 20 records', async () => {
        // SpotifyService.getInstance() makes a network call and sets the Spotify API auth token.
        // Its called whenever the server starts. Here, the server isn't started and thus some delay
        // is necessary before any Spotify requests are made.
        setTimeout(async () => {
            const tracks = await spotifyServiceInstance.searchTracks('');
            expect(tracks.length).toBe(20);
        }, 2000);
    })
})