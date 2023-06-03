import { NextFunction, Request, Response } from "express";
import { IMovies, TCategories, TMoviesResult } from "./interfaces";
import { client } from './database';

const validateMovieCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { category } = req.body;
    const possibleCategory: TCategories[] = ["Animação", "Ficção", "Romance", "Ação", "Comédia", "Drama", "Suspense"]
    if (!possibleCategory.includes(category)) {
        const message: string = `Possible categories are: ${possibleCategory}.`
        return res.status(400).json({ message })
    }

    return next();
}

const categoryExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { category } = req.params;
    const queryResult1: TMoviesResult = await client.query(
        "SELECT * FROM movies WHERE category = $1;",
        [category]
      );
    
    const moviesByCategory: IMovies[] = queryResult1.rows;

      if(moviesByCategory.length > 0) {
        return res.status(200).json(moviesByCategory);
      } 

      return next()
};

const idExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { id } = req.params;
  const queryResult: TMoviesResult = await client.query(
    "SELECT * FROM movies WHERE id = $1;",
    [id]
  );

  const movie: IMovies = queryResult.rows[0];

  if(!movie) {
    return res.status(404).json({message: "Movie not found."});
  }

  res.locals = {
    ...res.locals, foundMovie: movie
  }

  return next();
};

const nameExist = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { name } = req.body
    const queryResult: TMoviesResult = await client.query(
        "SELECT * FROM movies WHERE name = $1;",
        [name]
      );
    
      const movie: IMovies = queryResult.rows[0];
    
      if(movie) {
        return res.status(409).json({message: "Movie name already exists!"});
      }
    
      res.locals = {
        ...res.locals, foundMovie: movie
      }

    return next();
};

export { categoryExist, idExist, nameExist, validateMovieCategory };
