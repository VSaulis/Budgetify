﻿using System.Collections.Generic;

 namespace Budget.Dtos.Authentication
{
    public class LoggedUserDto
    {
        public string Email { get; set; }
        public string RefreshToken { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
        public List<string> Permissions { get; set; }
    }
}