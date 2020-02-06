﻿using Budget.Models.Filters;

namespace Budget.Models.Repositories
{
    public interface ICategoryRepository : IBaseRepository<Category, CategoriesFilter>
    {
    }
}