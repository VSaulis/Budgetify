using System.ComponentModel.DataAnnotations;

namespace Budget.Contracts.Authentication
{
    public class RegisterRequest : BaseRequest
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}