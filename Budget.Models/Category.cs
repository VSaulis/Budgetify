using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Budget.Models
{
    public class Category : BaseModel
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        
        public List<Operation> Operations { get; set; }
    }
}