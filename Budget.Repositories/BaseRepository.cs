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
        protected readonly SqlContext _context;

        protected BaseRepository(SqlContext context)
        {
            _context = context;
        }

        public async Task<int> AddAsync(TModel model)
        {
            model.Created = DateTime.Now;
            await _context.Set<TModel>().AddAsync(model);
            await _context.SaveChangesAsync();
            return model.Id;
        }

        public async Task DeleteAsync(TModel model)
        {
            _context.Set<TModel>().Remove(model);
            await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(TModel model)
        {
            model.Updated = DateTime.Now;
            _context.Set<TModel>().Update(model);
            await _context.SaveChangesAsync();
            return model.Id;
        }

        public async Task<TModel> GetAsync(Expression<Func<TModel, bool>> filter)
        {
            IQueryable<TModel> models = _context.Set<TModel>();
            models = FormatQuery(models);
            return await models.FirstOrDefaultAsync(filter);
        }

        public async Task<List<TModel>> GetListAsync(Expression<Func<TModel, bool>> filter = null, Sort<TModel> sort = null, Paging paging = null)
        {
            IQueryable<TModel> models = _context.Set<TModel>();
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
            if (filter != null) return await _context.Set<TModel>().CountAsync(filter);
            return await _context.Set<TModel>().CountAsync();
        }

        protected abstract IQueryable<TModel> FormatQuery(IQueryable<TModel> query);
    }
}