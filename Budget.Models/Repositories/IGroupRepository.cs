using Budget.Models.Filters;

namespace Budget.Models.Repositories
{
    public interface IGroupRepository : IBaseRepository<Group, GroupsFilter>
    {
    }
}