using Budget.Dtos.User;

namespace Budget.Dtos.Category
{
    public class CategoryDto : BaseDto
    {
        public string Name { get; set; }
        public UsersListItemDto CreatedBy { get; set; }
    }
}