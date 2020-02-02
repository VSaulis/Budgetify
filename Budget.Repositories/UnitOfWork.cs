using System.Threading.Tasks;
using Budget.Models.Repositories;
using Budget.Repositories.Context;

namespace Budget.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SqlContext _context;
        
        public UnitOfWork(SqlContext context)
        {
            _context = context;
        }
        
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}