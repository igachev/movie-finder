using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Models;

namespace movies_api.Interfaces
{
    public interface IMovieRepository
    {
        Task<List<Movie>> GetMovies();
        Task<Movie> CreateMovie(Movie movie);
        Task<Movie?> GetMovie(int id);
        Task<Movie?> DeleteMovie(int id);
    }
}