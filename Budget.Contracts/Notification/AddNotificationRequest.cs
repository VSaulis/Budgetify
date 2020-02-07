using System.ComponentModel.DataAnnotations;
using Budget.Constants.Enums;

namespace Budget.Contracts.Notification
{
    public class AddNotificationRequest : BaseRequest
    {
        [Required]
        public NotificationTypes Type { get; set; }
    }
}