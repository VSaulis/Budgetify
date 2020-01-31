using System;
using Budget.Dtos.Category;

namespace Budget.Dtos.Operation
{
    public class OperationDto : BaseDto
    {
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public CategoryDto Category { get; set; }
        public string Description { get; set; }
    }
}