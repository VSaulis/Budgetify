using System.ComponentModel.DataAnnotations;
using Budget.Constants.Enums;

namespace Budget.Contracts
{
    public class ListRequest : BaseRequest
    {
        [Required]
        public int Limit { get; set; }
        [Required]
        public int Offset { get; set; }
        [Required]
        public string SortColumn { get; set; }
        [Required]
        public SortTypes SortType { get; set; }
    }
}