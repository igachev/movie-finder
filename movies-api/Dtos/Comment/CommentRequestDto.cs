using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace movies_api.Dtos.Comment
{
    public class CommentRequestDto
    {
        [Required]
        public string Content { get; set; } = string.Empty;
    }
}