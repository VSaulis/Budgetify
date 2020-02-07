using System.Linq;
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
            return query;
        }

        protected override IQueryable<Notification> ApplySort(IQueryable<Notification> query, Sort sort)
        {
            return query;
        }
    }
}