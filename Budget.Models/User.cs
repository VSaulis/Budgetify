﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Budget.Constants.Enums;

namespace Budget.Models
{
    public class User : BaseModel
    {
        [Required]
        public string Email { get; set; }
        
        public string? Avatar { get; set; }
        
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [Required] 
        public UserStatuses Status { get; set; } = UserStatuses.Unverified;
        
        public byte[] PasswordSalt { get; set; }
        
        public byte[] PasswordHash { get; set; }
        
        public string RefreshToken { get; set; }
        
        [Required]
        public List<Roles> Roles { get; set; }
        
        public List<Category> Categories { get; set; }
        public List<Operation> Operations { get; set; }
    }
}