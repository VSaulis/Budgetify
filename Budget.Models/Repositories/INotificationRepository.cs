using Budget.Models.Filters;

namespace Budget.Models.Repositories
{
    public interface INotificationRepository : IBaseRepository<Notification, NotificationsFilter>
    {
    }
}