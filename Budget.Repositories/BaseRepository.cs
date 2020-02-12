using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
    public abstract class BaseRepository<TModel, TFilter> : IBaseRepository<TModel, TFilter> where TModel : BaseModel where TFilter : BaseFilter
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

        public void HardDelete(TModel model)
        {
            Context.Set<TModel>().Remove(model);
        }
        
        public void Delete(TModel model)
        {
            model.Deleted = true;
            Context.Set<TModel>().Update(model);
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

        public async Task<List<TModel>> GetListAsync(TFilter filter = null, Sort sort = null, Paging paging = null)
        {
            IQueryable<TModel> models = Context.Set<TModel>();
            models = FormatQuery(models);
            models = ApplyFilter(models, filter);
            models = ApplySort(models, sort);
            models = ApplyPaging(models, paging);
            return await models.ToListAsync();
        }

        public async Task<int> CountAsync(TFilter filter = null)
        {
            IQueryable<TModel> models = Context.Set<TModel>();
            models = FormatQuery(models);
            models = ApplyFilter(models, filter);
            return await models.CountAsync();
        }

        private IQueryable<TModel> ApplyPaging(IQueryable<TModel> query, Paging paging)
        {
            if (paging != null) query = query.Skip(paging.Offset).Take(paging.Limit);
            return query;
        }
        
        protected abstract IQueryable<TModel> FormatQuery(IQueryable<TModel> query);
        protected abstract IQueryable<TModel> ApplyFilter(IQueryable<TModel> query, TFilter filter);
        protected abstract IQueryable<TModel> ApplySort(IQueryable<TModel> query, Sort sort);
    }
}