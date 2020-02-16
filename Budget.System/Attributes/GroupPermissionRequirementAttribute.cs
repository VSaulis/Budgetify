using System.Net;
using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Models.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Budget.System.Attributes
{
    public class GroupPermissionRequirementAttribute : AuthorizeAttribute, IAsyncAuthorizationFilter
    {
        private readonly GroupPermissions _groupPermission;

        public GroupPermissionRequirementAttribute(GroupPermissions groupPermission)
        {
            _groupPermission = groupPermission;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var authenticationService = (IAuthenticationService) context.HttpContext.RequestServices.GetService(typeof(IAuthenticationService));
            var loggedUser = await authenticationService.GetLoggedUserAsync();
            if (loggedUser == null)
            {
                context.Result = GetForbiddenResult();
                return;
            }
            
            if (!loggedUser.Permissions.Contains(Permissions.CanAddGroups)) context.Result = GetForbiddenResult();
        }

        private StatusCodeResult GetForbiddenResult()
        {
            return new StatusCodeResult((int) HttpStatusCode.Forbidden);
        }
    }
}