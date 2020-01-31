using System;

namespace Budget.Contracts.Category
{
    public class EditCategoryRequest : BaseRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? Version { get; set; }
    }
}