/**
 * @file Declares service for music discovery resource.
 */
import TrackI from "../models/tracks/TrackI";

export default interface MusicDiscoveryServiceI {
    /**
     * Retrieves all tracks based on a search query.
     * @param query A generic query that could be the track name or the artist name.
     */
    searchTracks (query: string): Promise<TrackI[]>;
}