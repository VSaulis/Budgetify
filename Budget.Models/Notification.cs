using System;
using System.ComponentModel.DataAnnotations;
using Budget.Constants.Enums;

namespace Budget.Models
{
    public class Notification : BaseModel
    {
        [Required]
        public int ReceiverId { get; set; }
        public User Receiver { get; set; }
        
        [Required]
        public int NotifierId { get; set; }
        public User Notifier { get; set; }
     
        [Required]
        public NotificationTypes Type { get; set; }
        
        public int? EntityId { get; set; }
        public string StringValue { get; set; }
        public decimal? DecimalValue { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        
        [Required] 
        public bool IsViewed { get; set; } = false;
    }
}