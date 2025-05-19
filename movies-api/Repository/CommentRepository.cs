using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using movies_api.Data;
using movies_api.Interfaces;
using movies_api.Models;

namespace movies_api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Comment> AddComment(Comment comment)
        {
            try
            {
                var movie = await _context.Movie.FirstOrDefaultAsync((m) => m.Id == comment.MovieId);
                if (movie == null)
                {
                    throw new Exception("you cannot create a comment for movie that does not exist");
                }
                else
                {
                    await _context.Comment.AddAsync(comment);
                    await _context.SaveChangesAsync();
                    return comment;
            }
           }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<Comment> DeleteComment(int commentId)
        {
            try
            {
                var comment = await _context.Comment.FirstOrDefaultAsync((c) => c.Id == commentId);
                if (comment == null)
                {
                    throw new Exception("No such comment");
                }
                else
                {
                    _context.Comment.Remove(comment);
                    await _context.SaveChangesAsync();
                    return comment;
                }
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<Comment> EditComment(int commentId, Comment comment)
        {
            try
            {
                var movie = await _context.Movie.FirstOrDefaultAsync((m) => m.Id == comment.MovieId);
                var commentExists = await _context.Comment.FirstOrDefaultAsync((c) => c.Id == commentId);
                if (movie == null)
                {
                    throw new Exception("you cannot edit a comment for movie that does not exist");
                }
                else if (commentExists == null)
                {
                    throw new Exception("comment not found");
                }
                else
                {
                    commentExists.Content = comment.Content;
                    await _context.SaveChangesAsync();
                    return commentExists;
                }
            }
            catch (Exception e)
            {
                throw;
            }
            
        }
    }
}