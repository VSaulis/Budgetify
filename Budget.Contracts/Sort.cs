using System.ComponentModel.DataAnnotations;
using Budget.Constants.Enums;

namespace Budget.Contracts
{
    public class Sort
    {
        [Required]
        public SortTypes Type { get; set; }
        
        [Required]
        public string Column { get; set; }
    }
}