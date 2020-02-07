using System.Linq;
using Microsoft.AspNetCore.SignalR;

namespace Budget.Hubs.Providers
{
    public class UserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User.Claims.FirstOrDefault(claim => claim.Type == "Id")?.Value;
        }
    }
}