using System.Linq;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public class NotificationRepository : BaseRepository<Notification, NotificationsFilter>, INotificationRepository
    {
        public NotificationRepository(SqlContext context) : base(context)
        {
        }

        protected override IQueryable<Notification> FormatQuery(IQueryable<Notification> query)
        {
            return query
                .Include(notification => notification.Notifier)
                .Include(notification => notification.Receiver);
        }

        protected override IQueryable<Notification> ApplyFilter(IQueryable<Notification> query, NotificationsFilter filter)
        {
            if (filter.NotifierId.HasValue) query = query.Where(notification => notification.NotifierId == filter.NotifierId);
            if (filter.ReceiverId.HasValue) query = query.Where(notification => notification.ReceiverId == filter.ReceiverId);
            return query;
        }

        protected override IQueryable<Notification> ApplySort(IQueryable<Notification> query, Sort sort)
        {
            if (sort != null)
            {
                if (sort.Column == "created")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(notification => notification.Created);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(notification => notification.Created);
                }
            }
           
            return query;
        }
    }
}