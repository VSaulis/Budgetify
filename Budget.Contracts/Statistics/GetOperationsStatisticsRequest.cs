using System;
using System.Collections.Generic;
using Budget.Constants.Enums;

namespace Budget.Contracts.Statistics
{
    public class GetOperationsStatisticsRequest : BaseRequest
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public List<int> UsersIds { get; set; }
        public List<int> CategoriesIds { get; set; }
        public decimal? AmountFrom { get; set; }
        public decimal? AmountTo { get; set; }
        public DateRanges Range { get; set; }
    }
}