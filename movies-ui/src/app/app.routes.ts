import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'movies',component: MoviesComponent}
];
