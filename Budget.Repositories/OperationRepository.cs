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
    public class OperationRepository : BaseRepository<Operation, OperationsFilter>, IOperationRepository
    {
        public OperationRepository(SqlContext context) : base(context)
        {
        }

        protected override IQueryable<Operation> FormatQuery(IQueryable<Operation> query)
        {
            return query
                .Include(operation => operation.Category)
                .Include(operation => operation.User);
        }

        protected override IQueryable<Operation> ApplyFilter(IQueryable<Operation> query, OperationsFilter filter)
        {
            if (filter.AmountFrom.HasValue) query = query.Where(operation => operation.Amount >= filter.AmountFrom.Value);
            if (filter.AmountTo.HasValue) query = query.Where(operation => operation.Amount <= filter.AmountTo.Value);
            if (filter.DateFrom.HasValue) query = query.Where(operation => operation.Date >= filter.DateFrom.Value);
            if (filter.DateTo.HasValue) query = query.Where(operation => operation.Date <= filter.DateTo.Value);
            if (filter.CategoriesIds.Count > 0) query = query.Where(operation => filter.CategoriesIds.Contains(operation.CategoryId));
            if (filter.UsersIds.Count > 0) query = query.Where(operation => filter.UsersIds.Contains(operation.UserId));
            return query;
        }

        protected override IQueryable<Operation> ApplySort(IQueryable<Operation> query, Sort sort)
        {
            if (sort != null)
            {
                if (sort.Column == "category")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(operation => operation.Category.Name);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(operation => operation.Category.Name);
                }
                
                if (sort.Column == "amount")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(operation => operation.Amount);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(operation => operation.Amount);
                }
                
                if (sort.Column == "date")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(operation => operation.Date);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(operation => operation.Date);
                }
                
                if (sort.Column == "user")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(operation => operation.User.FirstName).ThenBy(operation => operation.User.LastName);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(operation => operation.User.FirstName).ThenBy(operation => operation.User.LastName);
                }
                
                if (sort.Column == "updated")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(operation => operation.Updated);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(operation => operation.Updated);
                }
                
                if (sort.Column == "created")
                {
                    if (sort.Type == SortTypes.Asc) query = query.OrderBy(operation => operation.Created);
                    if (sort.Type == SortTypes.Desc) query = query.OrderByDescending(operation => operation.Created);
                }
            }
           
            return query;
        }

        public async Task<decimal> TotalAsync(OperationsFilter filter = null)
        {
            IQueryable<Operation> models = Context.Operations;
            models = FormatQuery(models);
            models = ApplyFilter(models, filter);
            return await models.Select(operation => operation.Amount).FirstOrDefaultAsync();
        }
    }
}