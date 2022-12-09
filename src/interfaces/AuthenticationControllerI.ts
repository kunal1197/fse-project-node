import {Request, Response} from "express";

/**
 * @file Declares controller that can talk to the front-end services for authentication
 */
export default interface AuthenticationControllerI {
    profile(req: Request, res: Response): void;
    signup(req: Request, res: Response): void;
    logout(req: Request, res: Response): void;
}