import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)},
    {path:'movies',loadComponent: () => import('./pages/movies/movies.component').then((c) => c.MoviesComponent)},
    {path:'movies/:id/details',loadComponent: () => import('./pages/movie-details/movie-details.component').then((c) => c.MovieDetailsComponent)},
    {path:'movies/filter-by-genre',loadComponent: () => import('./pages/filter-movies-by-genre/filter-movies-by-genre.component').then((c) => c.FilterMoviesByGenreComponent)},
    {path:'users/register',loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent)},
    {path:'users/login',loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)},
    {path:'movies/create',loadComponent: () => import('./pages/create-movie/create-movie.component').then((c) => c.CreateMovieComponent)},
    {path:'movies/:id/edit',loadComponent: () => import('./pages/edit-movie/edit-movie.component').then((c) => c.EditMovieComponent)}
];
