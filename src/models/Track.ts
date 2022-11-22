/**
 * @file Declares Track data type representing music tracks.
 */

/**
 * @typedef Track Represents a music track.
 * @property {string} id The id returned by the music discovery service (not the database id).
 * @property {string} title The name of the track.
 * @property {string} image The URL to the image resource
 * @property {string} releaseYear The year of release of this track.
 */
export default interface Track {
    id: string
    title: string,
    image: string,
    releaseYear: string
}