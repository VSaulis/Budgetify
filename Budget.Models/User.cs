using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Budget.Constants.Enums;

namespace Budget.Models
{
    public class User : BaseModel
    {
        [Required]
        public string Email { get; set; }

        [Required] 
        public UserStatuses Status { get; set; } = UserStatuses.Unverified;
        
        public byte[] PasswordSalt { get; set; }
        
        public byte[] PasswordHash { get; set; }
        
        public string RefreshToken { get; set; }
        
        [Required]
        public List<Roles> Roles { get; set; }
    }
}