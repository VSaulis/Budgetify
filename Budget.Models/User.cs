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
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }

        [Required] 
        public UserStatuses Status { get; set; } = UserStatuses.Unverified;
        
        [Required]
        public byte[] PasswordSalt { get; set; }
        
        [Required]
        public byte[] PasswordHash { get; set; }
        
        public string RefreshToken { get; set; }

        public List<GroupUser> UserGroups { get; set; } 
        public List<Operation> Operations { get; set; }
        public List<Notification> ReceivedNotifications { get; set; }
        public List<Notification> SendNotifications { get; set; }
        
        public string Initials()
        {
            if (FirstName != null && LastName != null) return $"{FirstName[0]}{LastName[0]}";
            return $"{Email[0]}{Email[1]}";
        }
    }
}