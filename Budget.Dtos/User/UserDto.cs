using System.Collections.Generic;

namespace Budget.Dtos.User
{
    public class UserDto : BaseDto
    {
        public string Email { get; set; }
        public string Status { get; set; }
        public List<string> Roles { get; set; }
    }
}