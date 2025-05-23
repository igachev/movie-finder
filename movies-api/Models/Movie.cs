using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace movies_api.Models
{
    [Table("Movies")]
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImgUrl { get; set; } = string.Empty;
        // one to many -> comment
        public List<Comment> Comments { get; set; } = new List<Comment>();
        // one to many -> category
        public List<Genre> Genres { get; set; } = new List<Genre>();
        // many to many
        public List<MovieGenre> MovieGenre { get; set; } = new List<MovieGenre>();
    }
}