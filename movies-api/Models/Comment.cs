using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace movies_api.Models
{
    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        // many to one -> Movie
        public int? MovieId { get; set; }
        public Movie? Movie { get; set; }
    }
}