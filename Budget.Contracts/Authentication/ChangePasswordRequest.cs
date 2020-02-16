using System.ComponentModel.DataAnnotations;

namespace Budget.Contracts.Authentication
{
    public class ChangePasswordRequest : BaseRequest
    {
        [Required]
        public string CurrentPassword { get; set; }
        
        [Required]
        public string NewPassword { get; set; }
    }
}