using System.Linq;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public class OperationRepository : BaseRepository<Operation>, IOperationRepository
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
    }
}