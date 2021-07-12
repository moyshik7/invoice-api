import { Request, Response } from 'express'
import { Tokens, User } from './../typings'
import { Database } from './../res/db'

import { RandomUserID, RandomAuthToken } from './../res/random'
import { Password } from './../res/password'

export const Login = (app: any, db: Database) => {
    app.post('/login', async (req: Request, res: Response): Promise<void> => {
        /**
         * Error 400: Bad request 
         */
        if(!req.user){ return res.status(400).json({ code: 400, error: "Provide a valid user" }) }
        if(!req.user.username && !req.user.email){ return res.status(400).json({ code: 400, error: "Provide a valid username or email" }) }
        if(!req.user.password){ return res.status(400).json({ code: 400, error: "Provide a valid password" }) }
        let user: User;
        if(req.user.username.length){
            user = await db.GetUserByUsername(req.user.username)
        } else {
            user = await db.GetUserByEmail(req.user.email)
        }
        if(!user){
            return res.status(403).json({ code: 403, error: "Wrong username and/or password" })
        }
        const userpass = Password(user.username, req.user.password)
        if(userpass !== user.pass){
            return res.status(403).json({ code: 403, error: "Wrong username and/or password" })
        } else {
            const token = RandomAuthToken(user.username, user.id)
        }
        db.CreateNewToken(user.id, token).then((res_u: Tokens): void => {
        }).catch((err: any):void => {  // eslint-disable-line @typescript-eslint/no-unused-vars
            /**
             * Error 500: Internal server error 
             */
            res.status(500).json({ code: 500, error: "Something Went Wrong on our side" })
        })
    })
}
