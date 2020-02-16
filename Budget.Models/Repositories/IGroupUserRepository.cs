using Budget.Models.Filters;

namespace Budget.Models.Repositories
{
    public interface IGroupUserRepository : IBaseRepository<GroupUser, GroupsUsersFilter>
    {
    }
}