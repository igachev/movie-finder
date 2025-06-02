import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FilterMoviesByGenreComponent } from './pages/filter-movies-by-genre/filter-movies-by-genre.component';
import { CreateMovieComponent } from './pages/create-movie/create-movie.component';
import { EditMovieComponent } from './pages/edit-movie/edit-movie.component';

export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'movies',component: MoviesComponent},
    {path:'movies/:id/details',component: MovieDetailsComponent},
    {path:'movies/filter-by-genre',component: FilterMoviesByGenreComponent},
    {path:'users/register',component: RegisterComponent},
    {path:'users/login',component: LoginComponent},
    {path:'movies/create',component: CreateMovieComponent},
    {path:'movies/:id/edit',component: EditMovieComponent}
];
