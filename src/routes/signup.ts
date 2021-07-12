import { Request, Response } from 'express'
import { User } from './../typings'
import { Database } from './../res/db'

import { RandomUserID } from './../res/random'
import { Password } from './../res/password'

export const Signup = (app: any, db: Database) => {
    app.post('/signup', (req: Request, res: Response): void => {
        if(!req.user){
            /**
             * Error 406: Not acceptable 
             */
            res.status(406).json({ code: 406, error: "Provide a valid user"})
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
        db.CreateNewUser(user).then((res: User) => {
            if(!res){
                /**
                 * Error 500: Internal server error 
                 */
                res.status(500).json({ code: 500, error: "Something went wrong on our side"})

            }
            res.status(200).json({ code: 200, data: "New user created" })
        }).catch((err: any) => {
            /**
             * Error 500: Internal server error 
             */
            res.status(500).json({ code: 500, error: "Something went wrong on our side"})
        })
})
}
export {
    route as Signup
}