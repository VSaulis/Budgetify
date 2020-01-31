namespace Budget.Contracts.Authentication
{
    public class SetupPasswordRequest : BaseRequest
    {
        public string Token { get; set; }
        public string Password { get; set; }
    }
}