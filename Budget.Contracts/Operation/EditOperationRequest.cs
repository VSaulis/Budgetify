using System;

namespace Budget.Contracts.Operation
{
    public class EditOperationRequest : BaseRequest
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public DateTime? Version { get; set; }
    }
}