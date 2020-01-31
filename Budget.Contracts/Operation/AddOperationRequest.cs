using System;

namespace Budget.Contracts.Operation
{
    public class AddOperationRequest : BaseRequest
    {
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
    }
}