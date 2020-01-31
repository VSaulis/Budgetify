using Budget.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    public class BaseController : ControllerBase
    {
        protected T CreateResponse<T>(T response) where T : BaseResponse
        {
            Response.StatusCode = (int) response.Status;
            return response;
        }
    }
}