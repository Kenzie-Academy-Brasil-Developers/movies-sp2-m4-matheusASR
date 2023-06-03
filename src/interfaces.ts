import { QueryResult } from "pg";

type TCategories = "Animação" | "Ficção" | "Romance" | "Ação" | "Comédia" | "Drama" | "Suspense"

interface IMovies {
    id: number;
    name: string;
    category: TCategories;
    duration: number;
    price: number;
}

type TMoviesRequest = Omit<IMovies, "id">;
type TMoviesUpdateRequest = Partial<TMoviesRequest>
type TMoviesResult = QueryResult<IMovies>


export { IMovies, TMoviesRequest, TMoviesUpdateRequest, TMoviesResult, TCategories }