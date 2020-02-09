using Budget.Dtos.User;

namespace Budget.Dtos.Notification
{
    public class NotificationsListItemDto : BaseDto
    {
        public UsersListItemDto Notifier { get; set; }
        public string Type { get; set; }
    }
}