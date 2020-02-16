using System.Collections.Generic;
using System.Linq;
using Budget.Constants.Enums;
using Budget.Models.Services;

namespace Budget.Services
{
    public class PermissionsService : IPermissionsService
    {
        public List<Permissions> GetPermissions(List<Roles> roles)
        {
            var permissions = new List<Permissions>();

            foreach(var role in roles)
            {
                switch (role)
                {
                    case Roles.Owner:
                        // User
                        permissions.Add(Permissions.CanAddUsers);
                        permissions.Add(Permissions.CanEditUsers);
                        permissions.Add(Permissions.CanDeleteUsers);
                        permissions.Add(Permissions.CanViewUsers);
                        permissions.Add(Permissions.CanHardDeleteUsers);
                        // Groups
                        permissions.Add(Permissions.CanAddGroups);
                        permissions.Add(Permissions.CanEditGroups);
                        permissions.Add(Permissions.CanDeleteGroups);
                        permissions.Add(Permissions.CanViewGroups);
                        permissions.Add(Permissions.CanHardDeleteGroups);
                        // Settings
                        permissions.Add(Permissions.CanViewSettings);
                        permissions.Add(Permissions.CanEditSettings);
                        // Statistics
                        permissions.Add(Permissions.CanViewStatistics);
                        break;
                    
                    case Roles.FamilyMember:
                        // Settings
                        permissions.Add(Permissions.CanViewSettings);
                        // Dashboard
                        permissions.Add(Permissions.CanViewStatistics);
                        break;
                    
                    case Roles.Guest:
                        // Settings
                        // Dashboard
                        break;
                }
            }

            return permissions.Distinct().ToList();
        }
    }
}