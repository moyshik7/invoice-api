import { Request, Response } from 'express'
import { User, Snowflake } from './../typings'
import { Database } from './../res/db'

export const User_id = (app: any, db: Database): void => {
    app.get('/user/:id', (req: Request, res: Response): void => {
        /**
         * Error 400: Bad request 
         */
        if(!req.headers.authorization) { return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
        if(!req.params.id){ return res.status(400).json({ code: 400, error: "Provide a valid user id" }) }
        db.GetUserByToken(req.headers.authorization).then((_u: Snowflake | null): void => {
            if(!_u){ return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
            db.GetUserByID(req.params.id).then((_user: User | null) => {
                /**
                 * Now there's possibly no chance of the user returning null 
                 * but just to be safe 
                 */
                if(!_user){ return res.status(404).json({ code: 404, error: "User not found or deleted" }) }
                /**
                 * If everything goes well we'll return the user 
                 */
                return res.status(200).json({ code: 200, user: _user })
            })
            /**
             * In case something goes wrong 
             */
            .catch((err: any):void => {  // eslint-disable-line @typescript-eslint/no-unused-vars
                /**
                 * Error 500: Internal server error 
                 */
                res.status(500).json({ code: 500, error: "Something Went Wrong on our side" })
            })
        })
        /**
         * If database fails or something like that 
         */
        .catch((err: any):void => {  // eslint-disable-line @typescript-eslint/no-unused-vars
            /**
             * Error 500: Internal server error 
             */
            res.status(500).json({ code: 500, error: "Something Went Wrong on our side" })
        })
        
    })
}
