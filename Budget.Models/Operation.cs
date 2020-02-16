using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Budget.Models
{
    public class Operation : BaseModel
    {
        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        
        public string Description { get; set; }
    }
}