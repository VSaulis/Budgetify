using System.Threading.Tasks;

namespace Budget.Models.Repositories
{
    public interface IUnitOfWork
    {
        Task SaveChangesAsync();
    }
}