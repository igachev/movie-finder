import { Comment } from "./CommentTypes";
import { Genre } from "./GenreTypes";

export type Movie = {
    id: number;
    title: string;
    description: string;
    imgUrl: string;
    comments: Comment[];
    genres: Genre[];
}

export type MovieRequest = {
    title: string;
    description: string;
    imgUrl: string;
    genres: Genre[];
}

export type EditMovieRequest = {
    title: string;
    description: string;
    imgUrl: string;
}