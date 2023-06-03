import { Request, Response } from "express"
import { IMovies, TMoviesRequest, TMoviesResult } from "./interfaces"
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

const getMovieById = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(res.locals.foundMovie)
}

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
    const queryFormat: string = format(
        "UPDATE movies SET (%I) = ROW (%L) WHERE id = $1 RETURNING *;",
        Object.keys(req.body),
        Object.values(req.body),
    )

    const queryResult: TMoviesResult = await client.query(queryFormat, [req.params.id]) 

    return res.status(200).json(queryResult.rows[0])
}

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
    await client.query("DELETE FROM movies WHERE id = $1", [req.params.id])
    return res.status(204).json()
}

export {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
}