using System.Collections.Generic;

namespace Budget.Dtos.Profile
{
    public class ProfileDto
    {
        public string Email { get; set; }
        public decimal Balance { get; set; }
        public List<string> Roles { get; set; }
    }
}