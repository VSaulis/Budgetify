using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Budget.Models
{
    public class Category : BaseModel
    {
        [Required]
        public string Name { get; set; }
        
        public int? CreatedById { get; set; }
        public User CreatedBy { get; set; }

        public List<Operation> Operations { get; set; }
    }
}