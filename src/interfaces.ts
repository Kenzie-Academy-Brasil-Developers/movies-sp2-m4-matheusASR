interface IMovies {
    id: number;
    name: string;
    category: string;
    duration: number;
    price: number;
}

type TMoviesRequest = Omit<IMovies, "id">;
type TMoviesUpdateRequest = Partial<TMoviesRequest>


export { IMovies, TMoviesRequest, TMoviesUpdateRequest}