using System.ComponentModel.DataAnnotations;

namespace Budget.Contracts.Authentication
{
    public class RefreshTokenRequest : BaseRequest
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}