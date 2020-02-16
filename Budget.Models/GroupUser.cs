using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Budget.Constants.Enums;

namespace Budget.Models
{
    public class GroupUser : BaseModel
    {
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        
        [Required]
        public int GroupId { get; set; }
        public Group Group { get; set; }
        
        [Required]
        public List<Roles> Roles { get; set; }
    }
}