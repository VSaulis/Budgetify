using System.Linq;
using System.Threading.Tasks;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Repositories.Context;

namespace Budget.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(SqlContext context) : base(context) { }

        public async Task<User> GetByIdAsync(int id)
        {
            return await GetAsync(user => user.Id == id);
        }

        protected override IQueryable<User> FormatQuery(IQueryable<User> query)
        {
            return query;
        }
    }
}