using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Contracts;
using Budget.Contracts.Notification;
using Budget.Dtos.Notification;
using Budget.Hubs;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Hubs;
using Budget.Models.Repositories;
using Budget.Models.Services;
using Microsoft.AspNetCore.SignalR;

namespace Budget.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IHubContext<NotificationHub, INotificationHub> _hubContext;
        private readonly IAuthenticationService _authenticationService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public NotificationService(INotificationRepository notificationRepository, IMapper mapper, IUnitOfWork unitOfWork, IAuthenticationService authenticationService, IHubContext<NotificationHub, INotificationHub> hubContext)
        {
            _hubContext = hubContext;
            _authenticationService = authenticationService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _notificationRepository = notificationRepository;
        }

        public async Task<ListResponse<NotificationsListItemDto>> ListAsync(ListNotificationsRequest request)
        {
            var loggedUser = await _authenticationService.GetLoggedUserAsync();
            
            var paging = _mapper.Map<ListNotificationsRequest, Paging>(request);
            var sort = _mapper.Map<ListNotificationsRequest, Sort>(request);
            var filter = new NotificationsFilter {NotifierId = loggedUser.User.Id};

            var notifications = await _notificationRepository.GetListAsync(filter, sort, paging);
            var notificationsCount = await _notificationRepository.CountAsync(filter);

            var notificationsDtosList = _mapper.Map<List<Notification>, List<NotificationsListItemDto>>(notifications);
            return new ListResponse<NotificationsListItemDto>(notificationsDtosList, notificationsCount);
        }

        public async Task<BaseResponse> AddAsync(AddNotificationRequest request)
        {
            var loggedUser = await _authenticationService.GetLoggedUserAsync();
            var notification = _mapper.Map<AddNotificationRequest, Notification>(request);
            notification.NotifierId = loggedUser.User.Id;
            notification.ReceiverId = loggedUser.User.Id;
            await _notificationRepository.AddAsync(notification);
            
            var notificationDto = _mapper.Map<Notification, NotificationDto>(notification);
            await _hubContext.Clients.All.Notify(notificationDto);
            
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }
    }
}