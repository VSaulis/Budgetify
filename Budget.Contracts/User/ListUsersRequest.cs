namespace Budget.Contracts.User
{
    public class ListUsersRequest : ListRequest
    {
        public string Email { get; set; }
        public bool? Deleted { get; set; }
    }
}