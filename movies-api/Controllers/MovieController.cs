using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using movies_api.Dtos.Movie;
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
            var moviesDto = movies.Select((movie) => movie.ToMovieDto()).ToList();
            return Ok(moviesDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] MovieRequestDto movieRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this code shows our validation errors as response
            }

            try
            {
                var movie = movieRequestDto.ToMovie();
                var createdMovie = await _movieRepo.CreateMovie(movie);
                return CreatedAtAction(nameof(CreateMovie), new { id = createdMovie.Id }, createdMovie.ToMovieDto());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetMovie([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this code shows our validation errors as response
            }
            try
            {
                var movie = await _movieRepo.GetMovie(id);
                return Ok(movie.ToMovieDto());
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}