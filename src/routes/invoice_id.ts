import { Request, Response } from 'express'
import { Invoice, Snowflake } from './../typings'
import { Database } from './../res/db'

export const Invoice_id = (app: any, db: Database): void => {
    app.get('/invoice/:id', (req: Request, res: Response): void => {
        /**
         * Error 400: Bad request 
         */
        if(!req.headers.authorization) { return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
        if(!req.params.id){ return res.status(400).json({ code: 400, error: "Provide a valid id" }) }
        db.GetUserByToken(req.headers.authorization).then((_u: Snowflake | null): void => {
            if(!_u){ return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
            db.GetInvoiceByID(req.params.id).then((_inv: Invoice | null) => {
                /**
                 * If everything goes well we'll return the invoices
                 */
                if(!_inv){ return res.status(404).json({ code: 404, error: "Invoice not found" }) }
                if(_inv.user !== _u){ return res.status(403).json({ code: 403, error: "Access denied: You don't own this invoice" }) }
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
    app.delete('/invoice/:id', (req: Request, res: Response): void => {
        /**
         * Error 400: Bad request 
         * Error 403: Access Denied
         */
        if(!req.headers.authorization) { return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
        if(!req.params.id){ return res.status(400).json({ code: 400, error: "Provide a valid id" }) }
        db.GetUserByToken(req.headers.authorization).then((_u: Snowflake | null): void => {
            if(!_u){ return res.status(403).json({ code: 403, error: "No auth token or invalid auth token" }) }
            db.GetInvoiceByID(req.params.id).then((_inv: Invoice | null) => {
                /**
                 * If everything goes well we'll return the invoices
                 */
                if(!_inv){ return res.status(404).json({ code: 404, error: "Invoice not found" }) }
                /**
                 * One user can't delete other's invoice 
                 */
                if(_inv.user !== _u){ return res.status(403).json({ code: 403, error: "Access denied: You don't own this invoice" }) }
                db.DeleteInvoiceByID(_inv.id).then((): void => {
                    return res.status(200).json({ code: 200, message: "Successfully deleted invoice" })
                })
                /**
                 * In case something goes wrong 
                 */
                .catch((err: any): void => {  // eslint-disable-line @typescript-eslint/no-unused-vars
                    return res.status(500).json({ code: 500, error: "Something Went Wrong on our side" })
                })
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
