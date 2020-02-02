using System.Collections.Generic;
using System.Threading.Tasks;

namespace Budget.Handlers
{
    public abstract class BaseHandlerAsync<TRequest, TResponse>
    {
        public abstract Task<TResponse> HandleAsync(TRequest request);
        protected abstract Task<List<string>> ValidateAsync(TRequest request);
    }
}