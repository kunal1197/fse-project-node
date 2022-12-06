import UserDao from "../daos/UserDao";
import {Express} from "express";
import AuthenticationControllerI from "../interfaces/AuthenticationControllerI";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @file Declares controller that can talk to the front-end services for Authentication and also talk to the DAOs for
 * login, signup, profile and login
 */
export default class AuthenticationController implements AuthenticationControllerI {
    private static userDao: UserDao  = UserDao.getInstance();
    private static authenticationController: AuthenticationController | null = null;

    public static getInstance = (app: Express): AuthenticationController => {
        if (AuthenticationController.authenticationController == null) {
            AuthenticationController.authenticationController = new AuthenticationController();
            app.post("/api/auth/signup", AuthenticationController.authenticationController.signup);
            app.post("/api/auth/profile", AuthenticationController.authenticationController.profile);
            app.post("/api/auth/logout", AuthenticationController.authenticationController.logout);
            app.post("/api/auth/login", AuthenticationController.authenticationController.login);
        }

        return AuthenticationController.authenticationController;
    }

    private constructor() {

    }

    signup = async (req: any, res: any) => {
        const newUser = req.body;
        const password = newUser.password;
        console.log("PASS: ", password, saltRounds);
        newUser.password = await bcrypt.hash(password, saltRounds);
        const existingUser = await AuthenticationController.userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = await AuthenticationController.userDao.createUser(newUser);
            insertedUser.password = '';
            req.session['profile'] = insertedUser;
            await res.json(insertedUser);
        }
    }

    profile = (req: any, res: any) => {
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    logout = (req: any, res: any) => {
        console.log("Within logout")
        req.session.destroy();
        res.sendStatus(200);
    }

    login = async (req: any, res: any) => {
        try {
            const user = req.body;
            const username = user.username;
            const password = user.password;
            const existingUser = await AuthenticationController.userDao.findUserByUsername(username);
            if (!existingUser) {
                console.log("Before line 68")
                res.sendStatus(403);
                return;
            }
            console.log(password, existingUser.password, existingUser);
            const match = await bcrypt.compare(password,   existingUser.password);
            console.log(match)
            if (match) {
                existingUser.password = '*****';
                req.session['profile'] = existingUser;
                res.json(existingUser);
            } else {
                console.log("Before line 79")
                res.sendStatus(403);
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }

    };
}
