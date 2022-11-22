import Track from "../models/Track";

export default interface MusicDiscoveryServiceI {
    searchTracks (query: string): Promise<Track[]>;
}