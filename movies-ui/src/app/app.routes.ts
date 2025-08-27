import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {path:'',loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)},
    {path:'movies',loadComponent: () => import('./pages/movies/movies.component').then((c) => c.MoviesComponent)},
    {path:'movies/:id/details',loadComponent: () => import('./pages/movie-details/movie-details.component').then((c) => c.MovieDetailsComponent)},
    {path:'movies/filter-by-genre',loadComponent: () => import('./pages/filter-movies-by-genre/filter-movies-by-genre.component').then((c) => c.FilterMoviesByGenreComponent)},
    {path:'users/register',canActivate: [authGuard],loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent)},
    {path:'users/login',canActivate: [authGuard],loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent)},
    {path:'movies/create',canActivate: [adminGuard],loadComponent: () => import('./pages/create-movie/create-movie.component').then((c) => c.CreateMovieComponent)},
    {path:'movies/:id/edit',canActivate: [adminGuard],loadComponent: () => import('./pages/edit-movie/edit-movie.component').then((c) => c.EditMovieComponent)}
];
