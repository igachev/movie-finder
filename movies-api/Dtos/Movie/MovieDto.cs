using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Dtos.Comment;
using movies_api.Dtos.Genre;
using movies_api.Models;

namespace movies_api.Dtos.Movie
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<CommentDto> Comments { get; set; } = new List<CommentDto>();
        public List<GenreDto> Genres { get; set; } = new List<GenreDto>();
    }
}