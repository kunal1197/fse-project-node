/**
 * @file Declares RESTful Web service API for music discovery resource
 */
import {Request, Response} from "express";

export default interface MusicDiscoveryControllerI {
    /**
     * Retrieves music tracks based on a query.
     * @param {Request} req Represents request from client, including the q
     * parameter representing the search query.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the track objects
     */
    searchTracks (req: Request,  res: Response): void
}