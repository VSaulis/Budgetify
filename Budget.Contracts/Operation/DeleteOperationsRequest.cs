using System.Collections.Generic;

namespace Budget.Contracts.Operation
{
    public class DeleteOperationsRequest : BaseRequest
    {
        public List<int> OperationsIds { get; set; }
    }
}