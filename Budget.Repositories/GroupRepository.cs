using System.Linq;
using Budget.Contracts;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public class GroupRepository : BaseRepository<Group, GroupsFilter>, IGroupRepository
    {
        public GroupRepository(SqlContext context) : base(context)
        {
        }

        protected override IQueryable<Group> FormatQuery(IQueryable<Group> query)
        {
            return query
                .Include(group => group.Categories).ThenInclude(category => category.Operations)
                .Include(group => group.GroupUsers).ThenInclude(groupUser => groupUser.User);
        }
    }
}