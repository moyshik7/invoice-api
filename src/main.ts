/**
 * Import types
 */
import { Request, Response } from 'express'

/**
 * Import modules 
 */
import express from 'express'
import cors from 'cors'

import { DB_URL, DB_NAME, PORT } from './settings'
import { Database } from './res/db'


/**
 * Importing routes 
 */
import { Login } from './routes/login'


const app = new express()
/**
 * Using cors 
 * Otherwise it won't be able to receive foreign requests 
 * with window.fetch() on browser 
 */
app.use(cors())
/**
 * Using body parser
 */
app.use(express.json())

app.all('/', (req ?: Request, res ?: Response): void => {
    res.send(`Nothing to see here`)
})


Database.connect(DB_URL, DB_NAME).then((db: Database): void => {
    /**
     * Settings Database variables so that we can get them within the routes 
     */
    app.set('db', db)
    
    /**
     * Settings routes 
     */
    app.use('/login', Login)

    app.listen(PORT, (): void => {
        console.log(`App running on port ${PORT}`)
    })
}).catch(console.log)
