using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace movies_api.Models
{
    [Table("Genres")]
    public class Genre
    {
        public int Id { get; set; }
        public string GenreName { get; set; } = string.Empty;
        // many to one -> Movie
        public int? MovieId { get; set; }
        public Movie? Movie { get; set; }
    }
}