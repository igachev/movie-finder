using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movies_api.Dtos.User;
using movies_api.Interfaces;
using movies_api.Models;

namespace movies_api.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;

        public UserController(
            UserManager<AppUser> userManager,
            ITokenService tokenService,
            SignInManager<AppUser> signInManager
        )
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var appUser = new AppUser
                {
                    Email = registerUserDto.Email,
                    UserName = registerUserDto.Username
                };

                   var userEmailExists = await _userManager.Users.FirstOrDefaultAsync((user) => user.Email == appUser.Email.ToLower());
                if (userEmailExists != null)
                {
                    return BadRequest("User with that email already exists!");
                }

                var createdUser = await _userManager.CreateAsync(appUser, registerUserDto.Password);
                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                Email = appUser.Email,
                                Username = appUser.UserName,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }

            }
            catch (Exception e)
            {

                return StatusCode(500, e);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = await _userManager.Users.FirstOrDefaultAsync((user) => user.Email == loginDto.Email.ToLower());
                if (user == null)
                {
                    return Unauthorized("Invalid Email / Password");
                }
                var comparePasswords = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
                if (!comparePasswords.Succeeded)
                {
                    return Unauthorized("Invalid Email / Password");
                }
                return Ok(
                    new NewUserDto
                    {
                        Email = user.Email,
                        Username = user.UserName,
                        Token = _tokenService.CreateToken(user)
                    }
                );
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }


    }
}