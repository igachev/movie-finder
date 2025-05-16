using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using movies_api.Interfaces;
using movies_api.Mappers;

namespace movies_api.Controllers
{
    [Route("movies")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepo;
        public MovieController(
        IMovieRepository movieRepo
        )
        {
            _movieRepo = movieRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _movieRepo.GetMovies();
            if (movies == null)
            {
                return NotFound("Movies not found");
            }

            var moviesDto = movies.Select((movie) => movie.ToMovieDto()).ToList();
            return Ok(moviesDto);
        }

    }
}