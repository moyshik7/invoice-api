import { Request, Response } from 'express'
import { User } from './../typings'
import { Database } from './../res/db'

import { RandomUserID } from './../res/random'
import { Password } from './../res/password'

export const Signup = (app: any, db: Database) => {
    app.post('/signup', (req: Request, res: Response): void => {
        /**
         * Error 400: Bad request 
         */
        if(!req.user){ return res.status(400).json({ code: 400, error: "Provide a valid user" }) }
        if(!req.user.username){ return res.status(400).json({ code: 400, error: "Provide a valid username" }) }
        if(!req.user.email){ return res.status(400).json({ code: 400, error: "Provide a valid email" }) }
        if(!req.user.name){ return res.status(400).json({ code: 400, error: "Provide a valid name" }) }
        if(!req.user.password){ return res.status(400).json({ code: 400, error: "Provide a valid password" }) }

        db.GetUserByUsernameOrEmail(req.user.username, req.user.email).then((res_u: User | null): void => {
            if(res_u){
                return res.status(409).json({ code: 409, error: "username or email already exists" })
            }
            const user: User = {
                id: RandomUserID(req.user.username),
                username: req.user.username,
                email: req.user.email,
                name: req.user.name,
                joined: Date.now(),
                admin: false,
                password: Password(req.user.username, req.user.password)
            }
            db.CreateNewUser(user).then((res_user: User): void => {
                if(!res_user){
                    /**
                     * Error 500: Internal server error 
                     */
                    res.status(500).json({ code: 500, error: "Something went wrong on our side"})
                }
                res.status(200).json({ code: 200, data: "New user created" })
            }).catch((err: any) => { // eslint-disable-line @typescript-eslint/no-unused-vars
                /**
                 * Error 500: Internal server error 
                 */
                res.status(500).json({ code: 500, error: "Something went wrong on our side" })
            })
        }).catch((err: any):void => {  // eslint-disable-line @typescript-eslint/no-unused-vars
            /**
             * Error 500: Internal server error 
             */
            res.status(500).json({ code: 500, error: "Something Went Wrong on our side" })
        })
    })
}
