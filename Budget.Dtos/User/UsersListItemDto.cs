using System.Collections.Generic;

namespace Budget.Dtos.User
{
    public class UsersListItemDto : BaseDto
    {
        public string Avatar { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Status { get; set; }
        public List<string> Roles { get; set; }
    }
}