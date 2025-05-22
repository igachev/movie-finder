using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Helpers;
using movies_api.Models;

namespace movies_api.Interfaces
{
    public interface IMovieGenreRepository
    {
        Task<MovieGenre> AddMovieGenre(int movieId, int genreId);
        Task<List<Movie>> FilterMoviesByGenre(QueryObject query);
    }
}