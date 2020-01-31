using System;
using System.Linq.Expressions;
using Budget.Contracts;

namespace Budget.System.Helpers
{
    public static class ListHelper
    {
        public static Paging FormatPaging(ListRequest request)
        {
            if (!request.Limit.HasValue || !request.Offset.HasValue) return null;

            return new Paging
            {
                Limit = request.Limit.Value,
                Offset = request.Offset.Value
            };
        }

        public static Sort<TModel> FormatSort<TModel>(ListRequest request)
        {
            if (request.SortColumn == null || !request.SortType.HasValue) return null;
            var expression = Expression.Parameter(typeof(TModel), "m");
            var sortExpression = Expression.Lambda<Func<TModel, object>>(Expression.Convert(Expression.Property(expression, request.SortColumn), typeof(object)), expression);

            return new Sort<TModel>
            {
                Type = request.SortType.Value,
                Predicate = sortExpression
            };
        }
    }
}