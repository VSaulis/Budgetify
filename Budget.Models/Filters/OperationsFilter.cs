using System;
using System.Collections.Generic;

namespace Budget.Models.Filters
{
    public class OperationsFilter : BaseFilter
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public decimal? AmountFrom { get; set; }
        public decimal? AmountTo { get; set; }
        public List<int> CategoriesIds { get; set; }
        public List<int> UsersIds { get; set; }
    }
}