using Microsoft.Extensions.DependencyInjection;

namespace Budget.Hubs.DI
{
    public static class HubsModule
    {
        public static void RegisterDependencies(IServiceCollection services)
        {
            services.AddSignalR();
        }
    }
}