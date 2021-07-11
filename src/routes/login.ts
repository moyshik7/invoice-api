import { Request, Response } from 'express'
import { Router } from 'express'

const route = new Router()

route.post('/', (req: Request, res: Response): void => {
    if(!req.body.username && !req.body.email){
        const error = {
            //
        }
    }
    if(!req.headers.authorization){ 
        return res.status(403).json({ error: 'No auth token provided' })
    }
    const data = {
        code: 200,
        token: 'yefsusgsvswgjwkshsvsoshsgsgsbsbsbdvscscscwxzwxwvwjdkpdpdpdpddoud',
    }
    res.send(data)
})

export {
    route as Login
}