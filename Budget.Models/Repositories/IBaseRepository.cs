using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Budget.Contracts;

namespace Budget.Models.Repositories
{
    public interface IBaseRepository<TModel> where TModel : BaseModel
    {
        Task<int> AddAsync(TModel model);

        Task DeleteAsync(TModel model);

        Task<int> UpdateAsync(TModel model);

        Task<TModel> GetAsync(Expression<Func<TModel, bool>> filter);

        Task<List<TModel>> GetListAsync(Expression<Func<TModel, bool>> filter = null, Sort<TModel> sort = null, Paging paging = null);

        Task<int> CountAsync(Expression<Func<TModel, bool>> filter = null);
    }
}