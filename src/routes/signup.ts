import { Request, Response } from 'express'
import { Router } from 'express'

const route = new Router()

route.post('/', (req: Request, res: Response): void => {
    
})

export {
    route as Signup
}