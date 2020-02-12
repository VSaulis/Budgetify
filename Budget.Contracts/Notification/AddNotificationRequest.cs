using System;
using Budget.Constants.Enums;

namespace Budget.Contracts.Notification
{
    public class AddNotificationRequest
    {
        public int EntityId { get; set; }
        public NotificationTypes Type { get; set; }
        public int NotifierId { get; set; }
        public DateTime Date { get; set; }
        public string StringValue { get; set; }
        public decimal? DecimalValue { get; set; }
    }
}