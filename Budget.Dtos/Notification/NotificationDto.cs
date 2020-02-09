using Budget.Dtos.User;

namespace Budget.Dtos.Notification
{
    public class NotificationDto : BaseDto
    {
        public UsersListItemDto Notifier { get; set; }
        public string Type { get; set; }
    }
}