import express, { json } from 'express';
import 'dotenv/config'
import { createMovie, deleteMovie, getMovieById, getMovies, updateMovie } from './logic';
import { categoryExist, idExist, nameExist } from './middlewares';

const app = express();
app.use(json());

const PORT: number = 3000;
app.listen(PORT, () => console.log('Server is running'));
// console.log(process.env.PORT);

app.post('/movies', nameExist,createMovie)
app.get('/movies', getMovies)
app.get('/movies/:category', categoryExist)
app.get('/movies/:id', idExist,getMovieById)
app.patch('/movies/:id', nameExist, idExist, updateMovie)
app.delete('/movies/:id', idExist,deleteMovie)
