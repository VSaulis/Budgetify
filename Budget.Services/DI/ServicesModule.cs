using AutoMapper;
using Budget.Models.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Budget.Services.DI
{
    public class ServicesModule
    {
        public static void RegisterDependencies(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(ServicesModule));
            
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IEncryptionService, EncryptionService>();

            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IOperationService, OperationService>();
            services.AddScoped<IProfileService, ProfileService>();
        }
    }
}