using System.Collections.Generic;
using Budget.Constants.Enums;

namespace Budget.Models
{
    public class LoggedUser
    {
        public User User { get; set; }
        public List<Permissions> Permissions { get; set; }
        public string Token { get; set; }
    }
}