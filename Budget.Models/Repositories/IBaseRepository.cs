using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Budget.Contracts;

namespace Budget.Models.Repositories
{
    public interface IBaseRepository<TModel> where TModel : BaseModel
    {
        public Task<int> AddAsync(TModel model);

        public Task DeleteAsync(TModel model);

        public Task<int> UpdateAsync(TModel model);

        public Task<TModel> GetAsync(Expression<Func<TModel, bool>> filter);

        public Task<List<TModel>> GetListAsync(Expression<Func<TModel, bool>> filter = null, Sort<TModel> sort = null, Paging paging = null);

        public Task<int> CountAsync(Expression<Func<TModel, bool>> filter = null);
    }
}