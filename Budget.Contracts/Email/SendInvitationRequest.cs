namespace Budget.Contracts.Email
{
    public class SendInvitationRequest
    {
        public string Email { get; set; }
        public int GroupId { get; set; }
    }
}