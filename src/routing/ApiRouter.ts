import { Router } from 'express'
import { NedbController } from '../db/NedbController';

const api = Router();

api.get('/songs', (req, res) => {
    NedbController.getAllSongs().then((songs) => {
        songs.map((song) => {
            delete song.type;
            return song;
        })
        res.json(songs);
    })
})

export { api as ApiRouter }