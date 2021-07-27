import { Request, Response } from 'express'
import { User, Tokens } from './../typings'
import { Database } from './../res/db'

import { RandomAuthToken, RandomUserID } from './../res/random'
import { Password } from './../res/password'

export const Signup = (app: any, db: Database): void => {
    app.post('/signup', (req: Request, res: Response): void => {
        /**
         * Error 400: Bad request 
         */
        if(!req.body.user){ return res.status(400).json({ code: 400, error: "Provide a valid user" }) }
        if(!req.body.user.username){ return res.status(400).json({ code: 400, error: "Provide a valid username" }) }
        if(!req.body.user.email){ return res.status(400).json({ code: 400, error: "Provide a valid email" }) }
        if(!req.body.user.name){ return res.status(400).json({ code: 400, error: "Provide a valid name" }) }
        if(!req.body.user.password){ return res.status(400).json({ code: 400, error: "Provide a valid password" }) }

        db.GetUserByUsernameOrEmail(req.body.user.username, req.body.user.email).then((res_u: User | null): void => {
            if(res_u){
                return res.status(409).json({ code: 409, error: "username or email already exists" })
            }
            const user: User = {
                id: RandomUserID(req.body.user.username),
                username: req.body.user.username,
                email: req.body.user.email,
                name: req.body.user.name,
                joined: Date.now(),
                admin: false,
                password: Password(req.body.user.username, req.body.user.password)
            }
            db.CreateNewUser(user).then((res_user: User): void => {
                if(!res_user){
                    /**
                     * Error 500: Internal server error 
                     */
                    res.status(500).json({ code: 500, error: "Something went wrong on our side"})
                }
                const token = RandomAuthToken(user.username, user.id)
                db.CreateNewToken(user.id, token).then((token_n: Tokens): void => {
                    if(!token_n){
                        /**
                         * Error 500: Internal server error 
                         */
                        return res.status(500).json({ code: 500, error: "Something Went Wrong on our side" })
                    }
                    return res.status(200).json({ code: 200, token: token_n.token, expires: token_n.expires })
                }).catch((err: any):void => {  // eslint-disable-line @typescript-eslint/no-unused-vars
                    /**
                     * Error 500: Internal server error 
                     */
                    res.status(500).json({ code: 500, error: "Something Went Wrong on our side" })
                })
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
