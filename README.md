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
- `POST /comments/:movieId`: it adds a comment to particular movie
- `GET /comments/:commentId`: it shows particular comment
- `PUT /comments/movie/:movieId/comment/:commentId`: it edits particular comment
- `DELETE /comments/:commentId`: it deletes particular comment
