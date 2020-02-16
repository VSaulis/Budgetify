using System.Linq;
using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public class UserRepository : BaseRepository<User, UsersFilter>, IUserRepository
    {
        public UserRepository(SqlContext context) : base(context) { }

        protected override IQueryable<User> FormatQuery(IQueryable<User> query)
        {
            return query;
        }

        protected override IQueryable<User> ApplyFilter(IQueryable<User> query, UsersFilter filter)
        {
            if (filter.Deleted.HasValue) query = query.Where(user => user.Deleted == filter.Deleted.Value || user.Deleted == false);
            return query;
        }

        protected override IQueryable<User> ApplySort(IQueryable<User> query, Sort sort)
        {
            return sort.Column switch
            {
                "email" => (sort.Type == SortTypes.Asc ? query.OrderBy(user => user.Email) : query.OrderByDescending(user => user.Email)),
                "firstName" => (sort.Type == SortTypes.Asc ? query.OrderBy(user => user.FirstName) : query.OrderByDescending(user => user.FirstName)),
                "lastName" => (sort.Type == SortTypes.Asc ? query.OrderBy(user => user.LastName) : query.OrderByDescending(user => user.LastName)),
                "updated" => (sort.Type == SortTypes.Asc ? query.OrderBy(user => user.Updated) : query.OrderByDescending(user => user.Updated)),
                "created" => (sort.Type == SortTypes.Asc ? query.OrderBy(user => user.Created) : query.OrderByDescending(user => user.Created)),
                _ => query
            };
        }
    }
}