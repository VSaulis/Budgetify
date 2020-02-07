using System.Threading.Tasks;
using Budget.Dtos.Notification;

namespace Budget.Models.Hubs
{
    public interface INotificationHub
    {
        Task Notify(NotificationDto notification);
    }
}