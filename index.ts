import express, { Request, Response } from 'express'

import db from './db/db';
const PORT = process.env.PORT || 3001

const app = express()

app.get('/', (req: Request, res: Response) => {
    console.log('antes db');
    res.send('hello')
})

app.listen(PORT, () => {
    console.log(`app running on ${PORT}`)
})