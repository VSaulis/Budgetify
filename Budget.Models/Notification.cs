using System.ComponentModel.DataAnnotations;
using Budget.Constants.Enums;

namespace Budget.Models
{
    public class Notification : BaseModel
    {
        [Required]
        public NotificationTypes Type { get; set; }
        
        [Required]
        public int ReceiverId { get; set; }
        public User Receiver { get; set; }
        
        [Required]
        public int NotifierId { get; set; }
        public User Notifier { get; set; }

        [Required] 
        public bool IsViewed { get; set; } = false;
    }
}