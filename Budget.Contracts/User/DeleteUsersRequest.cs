using System.Collections.Generic;

namespace Budget.Contracts.User
{
    public class DeleteUsersRequest : BaseRequest
    {
        public List<int> UsersIds { get; set; }
    }
}