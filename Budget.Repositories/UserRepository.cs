using System.Linq;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public class UserRepository : BaseRepository<User, UsersFilter>, IUserRepository
    {
        public UserRepository(SqlContext context) : base(context)
        {
        }
        
        protected override IQueryable<User> FormatQuery(IQueryable<User> query)
        {
            return query
                .Include(user => user.Categories)
                .ThenInclude(category => category.Operations);
        }
    }
}