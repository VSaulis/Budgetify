using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Notification;
using Budget.Dtos.Notification;

namespace Budget.Models.Services
{
    public interface INotificationService
    {
        Task<ListResponse<NotificationsListItemDto>> ListAsync(ListNotificationsRequest request);
        Task<BaseResponse> AddAsync(AddNotificationRequest request);
    }
}