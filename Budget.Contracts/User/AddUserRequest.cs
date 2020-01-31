using System.Collections.Generic;

namespace Budget.Contracts.User
{
    public class AddUserRequest : BaseRequest
    {
        public string Email { get; set; }
        public List<string> Roles { get; set; }
    }
}