namespace Budget.Contracts.Profile
{
    public class EditProfileRequest : BaseRequest
    {
        public string Avatar { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}