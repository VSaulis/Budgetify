﻿using System.Collections.Generic;

 namespace Budget.Dtos.Authentication
{
    public class LoggedUserDto
    {
        public int UserId { get; set; }
        public string RefreshToken { get; set; }
        public string Token { get; set; }
    }
}