using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Dtos.Comment;
using movies_api.Dtos.Genre;
using movies_api.Dtos.Movie;
using movies_api.Models;

namespace movies_api.Mappers
{
    public static class MovieMapper
    {

        public static MovieDto ToMovieDto(this Movie movie)
        {
            return new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                Comments = movie.Comments.Select(c => c.ToCommentDto()).ToList(),
                Genres = movie.Genres.Select(g => g.ToGenreDto()).ToList()
            };
        }

        public static Movie ToMovie(this MovieRequestDto movieRequestDto)
        {
            return new Movie
            {
                Title = movieRequestDto.Title,
                Description = movieRequestDto.Description
            };
        }

    }
}