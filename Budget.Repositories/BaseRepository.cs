using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Repositories.Context;
using Microsoft.EntityFrameworkCore;

namespace Budget.Repositories
{
    public abstract class BaseRepository<TModel> : IBaseRepository<TModel> where TModel : BaseModel
    {
        protected readonly SqlContext Context;

        protected BaseRepository(SqlContext context)
        {
            Context = context;
        }

        public async Task AddAsync(TModel model)
        {
            model.Created = DateTime.Now;
            await Context.Set<TModel>().AddAsync(model);
        }

        public void Delete(TModel model)
        {
            Context.Set<TModel>().Remove(model);
        }

        public void Update(TModel model)
        {
            model.Updated = DateTime.Now;
            Context.Set<TModel>().Update(model);
        }

        public async Task<TModel> GetAsync(Expression<Func<TModel, bool>> filter)
        {
            IQueryable<TModel> models = Context.Set<TModel>();
            models = FormatQuery(models);
            return await models.FirstOrDefaultAsync(filter);
        }

        public async Task<List<TModel>> GetListAsync(Expression<Func<TModel, bool>> filter = null, Sort<TModel> sort = null, Paging paging = null)
        {
            IQueryable<TModel> models = Context.Set<TModel>();
            models = FormatQuery(models);

            if (filter != null) models = models.Where(filter);

            if (sort != null)
            {
                if (sort.Type == SortTypes.Asc) models = models.OrderBy(sort.Predicate);
                if (sort.Type == SortTypes.Desc) models = models.OrderByDescending(sort.Predicate);
            }
            else models = models.OrderByDescending(model => model.Created);

            if (paging != null) models = models.Skip(paging.Offset).Take(paging.Limit);

            return await models.ToListAsync();
        }

        public async Task<int> CountAsync(Expression<Func<TModel, bool>> filter = null)
        {
            if (filter != null) return await Context.Set<TModel>().CountAsync(filter);
            return await Context.Set<TModel>().CountAsync();
        }

        protected abstract IQueryable<TModel> FormatQuery(IQueryable<TModel> query);
    }
}