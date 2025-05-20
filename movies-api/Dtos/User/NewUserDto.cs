using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace movies_api.Dtos.User
{
    public class NewUserDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
    }
}