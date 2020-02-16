using System.Linq;
using Budget.Contracts;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public class GroupUserRepository : BaseRepository<GroupUser, GroupsUsersFilter>, IGroupUserRepository
    {
        public GroupUserRepository(SqlContext context) : base(context)
        {
        }

        protected override IQueryable<GroupUser> FormatQuery(IQueryable<GroupUser> query)
        {
            return query
                .Include(groupUser => groupUser.Group)
                .Include(groupUser => groupUser.User);
        }
    }
}