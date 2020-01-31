using System.Collections.Generic;
using Budget.Constants.Enums;

namespace Budget.Models.Services
{
    public interface IPermissionsService
    {
        List<Permissions> GetPermissions(List<Roles> roles);
    }
}