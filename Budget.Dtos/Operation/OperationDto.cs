using System;
using Budget.Dtos.Category;
using Budget.Dtos.User;

namespace Budget.Dtos.Operation
{
    public class OperationDto : BaseDto
    {
        public UsersListItemDto User { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public CategoryDto Category { get; set; }
        public string Description { get; set; }
    }
}