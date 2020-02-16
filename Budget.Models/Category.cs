using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Budget.Models
{
    public class Category : BaseModel
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public int GroupId { get; set; }
        public Group Group { get; set; }

        public List<Operation> Operations { get; set; }
    }
}