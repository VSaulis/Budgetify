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
            return query;
        }

        protected override IQueryable<User> ApplySort(IQueryable<User> query, Sort sort)
        {
            if (sort != null)
            {
                if (sort.Column == "email")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(user => user.Email);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(user => user.Email);
                }
                
                if (sort.Column == "firstName")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(user => user.FirstName);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(user => user.FirstName);
                }
                
                if (sort.Column == "lastName")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(user => user.LastName);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(user => user.LastName);
                }
                
                if (sort.Column == "updated")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(user => user.Updated);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(user => user.Updated);
                }
                
                if (sort.Column == "created")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(user => user.Created);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(user => user.Created);
                }
            }
           
            return query;
        }
    }
}