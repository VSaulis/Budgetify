namespace Budget.Models.Services
{
    public interface IEmailService
    {
        void SendInvitationToAreaEmail(string email, int areaId, string token);
    }
}