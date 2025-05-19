using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using movies_api.Dtos.Comment;
using movies_api.Interfaces;
using movies_api.Mappers;

namespace movies_api.Controllers
{
    [Route("comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }

        [HttpPost]
        [Route("{movieId:int}")]
        public async Task<IActionResult> AddComment(
            [FromRoute] int movieId,
            [FromBody] CommentRequestDto commentRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this code shows our validation errors as response
            }
            try
            {
                var comment = commentRequestDto.ToComment(movieId);
                var addedComment = await _commentRepo.AddComment(comment);
                return CreatedAtAction(nameof(AddComment), new { id = addedComment.Id }, addedComment.ToCommentDto());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("movie/{movieId:int}/comment/{commentId:int}")]
        public async Task<IActionResult> EditComment(
            [FromRoute] int movieId,
            [FromRoute] int commentId,
            [FromBody] CommentRequestDto commentRequestDto
            )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // this code shows our validation errors as response
            }
            try
            {
                var comment = commentRequestDto.ToComment(movieId);
                var editedComment = await _commentRepo.EditComment(commentId, comment);
                return Ok(editedComment.ToCommentDto());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("{commentId:int}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int commentId)
        {
            try
            {
                var deletedComment = await _commentRepo.DeleteComment(commentId);
                return Ok(deletedComment.ToCommentDto());   
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}