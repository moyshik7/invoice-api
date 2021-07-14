import { Request, Response } from 'express'
import { Invoice, Snowflake } from './../typings'
import { Database } from './../res/db'

import { RandomInvoiceID } from './../res/random'

export const Invoice_r = (app: any, db: Database): void => {
    app.get('/invoice', (req: Request, res: Response): void => {
        /**
         * Error 400: Bad request 
         */
        if(!req.headers.authorization) { return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
        db.GetUserByToken(req.headers.authorization).then((_u: Snowflake | null): void => {
            if(!_u){ return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
            db.GetInvoiceByUser(_u).then((_inv: Invoice[] | any[]) => {
                /**
                 * If everything goes well we'll return the invoices
                 */
                return res.status(200).json({ code: 200, invoices: _inv })
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
    app.post('/invoice', (req: Request, res: Response): void => {
        /**
         * Error 400: Bad request 
         * Error 403: Access denied
         */
        if(!req.headers.authorization) { return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
        if(!req.body.invoice){ return res.status(400).json({ code: 400, error: "provide a valid Invoice" }) }
        if(!req.body.invoice.title){ return res.status(400).json({ code: 400, error: "provide a valid Invoice title" }) }
        if(!req.body.invoice.description){ return res.status(400).json({ code: 400, error: "provide a valid Invoice description" }) }
        if(!req.body.invoice.payTo){ return res.status(400).json({ code: 400, error: "provide a valid name to pay" }) }
        if(!req.body.invoice.due){ return res.status(400).json({ code: 400, error: "provide a valid due time (Time Integer)" }) }
        if(!req.body.invoice.total){ return res.status(400).json({ code: 400, error: "provide a total amount" }) }
        
        if(typeof(req.body.invoice.due) !== 'number'){ return res.status(400).json({ code: 400, error: "Provide a valid due time for payment (Time Integer)" }) }
        if(typeof(req.body.invoice.total) !== 'number'){ return res.status(400).json({ code: 400, error: "Provide a valid amount for payment" }) }
        db.GetUserByToken(req.headers.authorization).then((_u: Snowflake | null): void => {
            if(!_u){ return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
            const _invoice: Invoice = {
                id: RandomInvoiceID(_u, req.body.invoice.title),
                title: req.body.invoice.title,
                description: req.body.invoice.description,
                user: _u,
                payTo: req.body.invoice.payTo,
                due: req.body.invoice.due,
                total: req.body.invoice.total,
                stats: {
                    completed: false
                }
            }
            db.CreateNewInvoice(_invoice).then((_inv: Invoice) => {
                /**
                 * If everything goes well we'll return the invoices
                 */
                return res.status(200).json({ code: 200, invoice: _inv })
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
