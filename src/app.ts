import 'dotenv/config'
import express, { Application, json } from 'express';
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from './logic';
import { idExist, nameExist } from './middlewares';
import { startDatabase } from './database';

const app: Application = express();
app.use(json());

app.listen(process.env.PORT, async () => {
    await startDatabase()
    console.log('Server is running')
});

app.post('/movies', nameExist, createMovie)
app.get('/movies', getMovies)
app.get('/movies/:id', idExist, getMovieById)
app.patch('/movies/:id', nameExist, idExist, updateMovie)
app.delete('/movies/:id', idExist, deleteMovie)
