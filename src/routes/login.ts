import { Request, Response } from 'express'
import { Tokens, User } from './../typings'
import { Database } from './../res/db'

import { RandomAuthToken } from './../res/random'
import { Password } from './../res/password'

export const Login = (app: any, db: Database): void => {
    app.post('/login', async (req: Request, res: Response): Promise<void> => {
        /**
         * Error 400: Bad request 
         */
        if(!req.body.user){ return res.status(400).json({ code: 400, error: "Provide a valid user" }) }
        if(!req.body.user.username && !req.body.user.email){ return res.status(400).json({ code: 400, error: "Provide a valid username or email" }) }
        if(!req.body.user.password){ return res.status(400).json({ code: 400, error: "Provide a valid password" }) }
        let user: User | null
        if(req.body.user.username.length){
            user = await db.GetUserByUsername(req.body.user.username)
        } else {
            user = await db.GetUserByEmail(req.body.user.email)
        }
        if(!user){
            return res.status(403).json({ code: 403, error: "Wrong username and/or password" })
        }
        const userpass = Password(user.username, req.body.user.password)
        if(userpass !== user.password){
            return res.status(403).json({ code: 403, error: "Wrong username and/or password" })
        } else {
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
        }
    })
}
