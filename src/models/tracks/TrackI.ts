/**
 * @file Declares TrackI data type representing music tracks.
 */

/**
 * @typedef TrackI Represents a music track.
 * @property {string} id The id returned by the music discovery service (not the database id).
 * @property {string} title The name of the track.
 * @property {string} image The URL to the image resource
 * @property {string} releaseYear The year of release of this track.
 */
export default interface TrackI {
    id: string
    title: string,
    images:string[],
    releaseYear: string,
    artists: string[]
    songLink: string,
    songDurationInMs: number
}