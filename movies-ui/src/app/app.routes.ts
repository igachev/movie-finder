import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'movies',component: MoviesComponent},
    {path:'movies/:id/details',component: MovieDetailsComponent},
    {path:'users/register',component: RegisterComponent},
    {path:'users/login',component: LoginComponent}
];
