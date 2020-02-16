using System.ComponentModel.DataAnnotations;

namespace Budget.Models
{
    public class Invitation : BaseModel
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}