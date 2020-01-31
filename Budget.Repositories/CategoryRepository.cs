using System.Linq;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Repositories.Context;

namespace Budget.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(SqlContext context) : base(context)
        {
        }

        protected override IQueryable<Category> FormatQuery(IQueryable<Category> query)
        {
            return query;
        }
    }
}