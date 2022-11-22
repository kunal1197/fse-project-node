import {Request, Response} from "express";

export default interface MusicDiscoveryControllerI {
    searchTracks (req: Request,  res: Response): void
}