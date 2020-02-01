using Budget.Dtos.User;

namespace Budget.Dtos.Category
{
    public class CategoriesListItemDto : BaseDto
    {
        public string Name { get; set; }
        public decimal Total { get; set; }
        public UsersListItemDto User { get; set; }
    }
}