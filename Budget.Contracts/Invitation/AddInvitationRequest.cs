using System.ComponentModel.DataAnnotations;

namespace Budget.Contracts.Invitation
{
    public class AddInvitationRequest : BaseRequest
    {
        [Required]
        public string Email { get; set; }
    }
}