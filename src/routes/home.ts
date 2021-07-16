import { Request, Response } from 'express'

export const Home = (app: any): void => {
    app.all('/', async (req: Request, res: Response): Promise<void> => {
        /**
         * Redirect to api docs 
         */
         res.status(301).redirect('https://moyshik7.gitbook.io/invoice-api/');
    })
}
