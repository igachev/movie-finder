using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using movies_api.Dtos.Comment;
using movies_api.Models;

namespace movies_api.Mappers
{
    public static class CommentMapper
    {
        public static Comment ToComment(this CommentRequestDto commentRequestDto, int movieId)
        {
            return new Comment
            {
                Content = commentRequestDto.Content,
                MovieId = movieId
            };
        }

        public static CommentDto ToCommentDto(this Comment comment) {
            return new CommentDto
            {
                Id = comment.Id,
                Content = comment.Content,
                CreatedOn = comment.CreatedOn,
                CreatedBy = comment.AppUser.UserName
            };
        }
    }
}