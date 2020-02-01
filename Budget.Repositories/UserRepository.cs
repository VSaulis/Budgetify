using System.Linq;
using System.Threading.Tasks;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(SqlContext context) : base(context) { }

        protected override IQueryable<User> FormatQuery(IQueryable<User> query)
        {
            return query
                .Include(user => user.Categories)
                    .ThenInclude(category => category.Operations);
        }
    }
}