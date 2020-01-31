using System.Threading.Tasks;

namespace Budget.Models.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User> GetByIdAsync(int id);
    }
}