using System.Linq;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Repositories.Context;

namespace Budget.Repositories
{
    public class CategoryRepository : BaseRepository<Category, CategoriesFilter>, ICategoryRepository
    {
        public CategoryRepository(SqlContext context) : base(context)
        {
        }

        protected override IQueryable<Category> FormatQuery(IQueryable<Category> query)
        {
            return query;
        }

        protected override IQueryable<Category> ApplyFilter(IQueryable<Category> query, CategoriesFilter filter)
        {
            if (filter != null)
            {
                if (filter.TotalFrom.HasValue) query = query.Where(category => category.Operations.Sum(operation => operation.Amount) >= filter.TotalFrom.Value);
                if (filter.TotalTo.HasValue) query = query.Where(category => category.Operations.Sum(operation => operation.Amount) <= filter.TotalTo.Value);
            }
            
            return query;
        }

        protected override IQueryable<Category> ApplySort(IQueryable<Category> query, Sort sort)
        {
            if (sort != null)
            {
                if (sort.Column == "name")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(category => category.Name);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(category => category.Name);
                }
                
                if (sort.Column == "total")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(category => category.Operations.Sum(operation => operation.Amount));
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(category => category.Operations.Sum(operation => operation.Amount));
                }
                
                if (sort.Column == "createdBy")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(category => category.User.FirstName).ThenBy(category => category.User.LastName);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(category => category.User.FirstName).ThenBy(category => category.User.LastName);
                }
                
                if (sort.Column == "updated")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(category => category.Updated);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(category => category.Updated);
                }
                
                if (sort.Column == "created")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(category => category.Created);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(category => category.Created);
                }
            }
           
            return query;
        }
    }
}