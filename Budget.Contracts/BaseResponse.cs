using System.Collections.Generic;
using System.Net;

namespace Budget.Contracts
{
    public class BaseResponse
    {
        public List<string> Errors { get; set; }
        public List<string> ValidationErrors { get; set; }
        public HttpStatusCode Status { get; set; } = HttpStatusCode.OK;
    }
}