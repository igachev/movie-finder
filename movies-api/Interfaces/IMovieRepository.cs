using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Helpers;
using movies_api.Models;

namespace movies_api.Interfaces
{
    public interface IMovieRepository
    {
        Task<List<Movie>> GetMovies(QueryObject query);
        Task<Movie> CreateMovie(Movie movie);
        Task<Movie?> GetMovie(int id);
        Task<Movie?> DeleteMovie(int id);
        Task<Movie?> EditMovie(int id, Movie movie);
    }
}