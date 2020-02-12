using System;
using Budget.Dtos.User;

namespace Budget.Dtos.Notification
{
    public class NotificationDto : BaseDto
    {
        public int? EntityId { get; set; }
        public string Type { get; set; }
        public UsersListItemDto Notifier { get; set; }
        public DateTime Date { get; set; }
        public string StringValue { get; set; }
        public decimal? DecimalValue { get; set; }
    }
}