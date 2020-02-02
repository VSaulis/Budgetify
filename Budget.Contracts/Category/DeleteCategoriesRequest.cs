using System.Collections.Generic;

namespace Budget.Contracts.Category
{
    public class DeleteCategoriesRequest : BaseRequest
    {
        public List<int> CategoriesIds { get; set; }
    }
}