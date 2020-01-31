using System;
using System.Collections.Generic;

namespace Budget.Contracts.User
{
    public class EditUserRequest : BaseRequest
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public DateTime? Version { get; set; }
    }
}