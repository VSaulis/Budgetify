using Budget.Models.Filters;

namespace Budget.Models.Repositories
{
    public interface IUserRepository : IBaseRepository<User, UsersFilter>
    {
    }
}