using System;
using System.ComponentModel.DataAnnotations;

namespace Budget.Models
{
    public class BaseModel
    {
        public int Id { get; set; }

        [Required]
        public DateTime Created { get; set; }
        
        public DateTime? Updated { get; set; }
    }
}