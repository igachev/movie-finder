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


