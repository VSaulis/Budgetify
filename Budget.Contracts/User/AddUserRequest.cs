using System.Collections.Generic;

namespace Budget.Contracts.User
{
    public class AddUserRequest : BaseRequest
    {
        public string? AvatarBase64String { get; set; }
        public string Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<string> Roles { get; set; }
    }
}