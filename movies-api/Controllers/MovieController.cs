using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using movies_api.Dtos.Movie;
using movies_api.Helpers;
using movies_api.Interfaces;
using movies_api.Mappers;
using movies_api.Models;

namespace movies_api.Controllers
{
    [Route("movies")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepo;
        private readonly IGenreRepository _genreRepo;
        public MovieController(
        IMovieRepository movieRepo,
        IGenreRepository genreRepo
        )
        {
            _genreRepo = genreRepo;
            _movieRepo = movieRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies([FromQuery] QueryObject query)
        {
            var movies = await _movieRepo.GetMovies(query);
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
                var genres = movieRequestDto.Genres;
               
                var createdMovie = await _movieRepo.CreateMovie(movie);
                 for (int i = 0; i < genres.Count; i++)
                {
        var createdGenre = await _genreRepo.AddGenre(new Genre { MovieId = createdMovie.Id, GenreName = genres[i] });
                }
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

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteMovie([FromRoute] int id)
        {
            try
            {
                var deletedMovie = await _movieRepo.DeleteMovie(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> EditMovie([FromRoute] int id, [FromBody] MovieRequestDto movieRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this code shows our validation errors as response
            }
            try
            {
                var editedMovie = await _movieRepo.EditMovie(id, movieRequestDto.ToMovie());
                return Ok(editedMovie.ToMovieDto());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}