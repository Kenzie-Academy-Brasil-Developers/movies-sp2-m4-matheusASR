import { Request, Response } from "express"
import { TMoviesRequest, TMoviesResult } from "./interfaces"
import format from "pg-format";
import { client } from "./database";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
    const payload: TMoviesRequest = req.body
    const queryFormat: string = format(
        "INSERT INTO movies (%I) VALUES (%L) RETURNING *;",
        Object.keys(payload),
        Object.values(payload)
      );
    const queryResult: TMoviesResult = await client.query(queryFormat);

    return res.status(201).json(queryResult.rows);
}

const getMovies = async (req: Request, res: Response): Promise<Response> => {
    const queryString: string = "SELECT * FROM movies;"
    const queryResult: TMoviesResult = await client.query(queryString)

    return res.status(200).json(queryResult.rows)
}

const getMoviesByCategory = async (req: Request, res: Response): Promise<Response> => {
    return res
}

const getMovieById = async (req: Request, res: Response): Promise<Response> => {
    return res
}

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
    return res
}

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    return res
}

export {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    getMoviesByCategory
}