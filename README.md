# movie-finder

## How It Works:
<p>There are 3 types of users: admin user,regular user,guest user</p>
<p><strong>The admin can:</strong> create movies,edit movies,delete movies</p>
<p><strong>The regular user can:</strong> add comments to particular movie,delete his own comments,edit his own comments</p>
<p><strong>guest user can:</strong> register,login,check out movies</p>
<h3>there are images below that visually explain how the application works</h3>

## Backend documentation:

## Installation of dotnet API:
1.Clone this repository: `git clone https://github.com/igachev/movie-finder.git`

2.Go to folder movie-finder: `cd movie-finder`

3.Go to folder movies-api: `cd movies-api`

4. Go to `appsettings.json` file and edit `Default Connection Data Source`: Data Source=`insert here your PC name e.g.DESKTOP-UH11A4B\\`

5. Create Migration: `dotnet ef migrations add SetupDb`

6. Update Database: `dotnet ef database update`

7. Start App: `dotnet watch run`


## Requirements:
- Microsoft.AspNetCore.Authentication.JwtBearer
- Microsoft.AspNetCore.Identity.EntityFrameworkCore
- Microsoft.AspNetCore.Mvc.NewtonsoftJson
- Microsoft.AspNetCore.OpenApi
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.Extensions.Identity.Core
- Newtonsoft.Json

## Endpoints:
- `POST /users/register`: it creates new user
- `POST /users/login`: Sign In user with valid credentials
- `GET /movies?pageNumber=1&pageSize=5`: it returns movies using pagination.5 movies per page
- `GET /movies/filterByGenre?pageNumber=1&pageSize=5&genreName=action`: it filters and returns movies by their genre
- `POST /movies`: it creates new movie
- `GET /movies/:id`: it shows particular movie
- `PUT /movies/:id`: it edits particular movie
- `DELETE /movies/:id`: it deletes particular movie


## Front-end documentation:
<p>This UI is built using Angular,Tailwind CSS</p>

## Installation:
8. make sure you have completed the above mentioned back end installation
9. Go to folder question-game-ui: `cd movies-ui`
10. Install the necessary dependencies: `npm install`
11. Run the UI: `ng serve`

## Routes:
- `/`: it shows the Home page.Available for all users.
- `/users/register`: it shows the Register page.Available only for guest user.
- `/users/login`: it shows the Login page.Available only for guest user.
- `/movies`: it shows the list of movies.There are 2 movies per page because of the pagination.Available for all users.Available for all users.
- `/movies/create`: it shows the form for creating a movie.Available only for admin user.
- `/movies/filter-by-genre`: it shows the movie list filtered by a genre.Pagination is applied and it shows 2 movies per page.Available for all users.
- `/movies/:id`: it shows details for particular movie,comments.Available for all users.
- `/movies/:id/edit`: it edits movie details.Available only for admin user.


## Images:
<div align="center">
  <p>Home Page</p>

  <img width="1895" height="976" alt="01 home" src="https://github.com/user-attachments/assets/99479ed1-4d0e-46c1-a445-47c1db927733" />

</div>

<div align="center">
  <p>Login Page</p>
  
  <img width="1359" height="982" alt="02 login" src="https://github.com/user-attachments/assets/842eb368-a1c1-4164-a122-aabaa31338a0" />

</div>

<div align="center">
  <p>Register Page</p>

  <img width="1411" height="971" alt="03 register" src="https://github.com/user-attachments/assets/b5237ac0-6a5a-44f1-b939-1281358bb5cd" />

</div>

<div align="center">
  <p>Filter Movies by Genre</p>
  
  <img width="1386" height="963" alt="04 filterMovies" src="https://github.com/user-attachments/assets/f3eca431-599b-4943-afa8-fbb51a2c2a57" />

</div>

<div align="center">
  <p>Movies Page</p>
  
  <img width="1390" height="981" alt="05 MoviesPage" src="https://github.com/user-attachments/assets/341e8425-f029-4e37-ba02-20aa33ee39ec" />

</div>

<div align="center">
  <p>Movie Details</p>
  
  <img width="1382" height="984" alt="06 MovieDetails" src="https://github.com/user-attachments/assets/8b39f43f-01c1-4102-aebf-ada053b6a8a4" />

</div>

<div align="center">
  <p>Movie Details with comments</p>
  
  <img width="1383" height="988" alt="07 Comments" src="https://github.com/user-attachments/assets/52e227c6-35cf-43dc-a444-6b4ac3e1be13" />

</div>

<div align="center">
  <p>Web Responsive Movies Page</p>
  
  <img width="1252" height="986" alt="08 web-responsive-movies" src="https://github.com/user-attachments/assets/a9da4ef2-50bd-4436-87b6-91e088be03c0" />

</div>

<div align="center">
  <p>Create Movie Page</p>
  
  <img width="1396" height="989" alt="09 create-movie" src="https://github.com/user-attachments/assets/93ba83b0-60d6-4e9c-9d1d-00d66ce5d2f5" />

</div>
