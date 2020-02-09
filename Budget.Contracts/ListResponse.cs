using System.Collections.Generic;

namespace Budget.Contracts
{
    public class ListResponse<T> : ResultResponse<List<T>>
    {
        public ListResponse(string message) : base(message) { }

        public ListResponse(List<T> result, int count, decimal? total = null) : base(result)
        {
            Count = count;
            Total = total;
        }

        public int Count { get; set; }
        
        public decimal? Total { get; set; }
    }
}