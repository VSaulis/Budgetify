using System;
using System.Linq.Expressions;
using Budget.Constants.Enums;

namespace Budget.Contracts
{
    public class Sort<TModel>
    {
        public SortTypes Type { get; set; }

        public Expression<Func<TModel, object>> Predicate { get; set; }
    }
}