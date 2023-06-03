import 'dotenv/config'
import express, { Application, json } from 'express';
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from './logic';
import { categoryExist, idExist, nameExist, validateMovieCategory } from './middlewares';
import { startDatabase } from './database';

const app: Application = express();
app.use(json());

app.listen(process.env.PORT, async () => {
    await startDatabase()
    console.log('Server is running')
});

app.post('/movies', nameExist, validateMovieCategory, createMovie)
app.get('/movies', getMovies)
app.get('/movies/:category', categoryExist, getMovies)
app.get('/movies/:id', idExist, getMovieById)
app.patch('/movies/:id', nameExist, idExist, validateMovieCategory, updateMovie)
app.delete('/movies/:id', idExist, deleteMovie)
