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
                        // Categories
                        permissions.Add(Permissions.CanAddCategories);
                        permissions.Add(Permissions.CanEditCategories);
                        permissions.Add(Permissions.CanDeleteCategories);
                        permissions.Add(Permissions.CanViewCategories);
                        // Operations
                        permissions.Add(Permissions.CanAddOperations);
                        permissions.Add(Permissions.CanEditOperations);
                        permissions.Add(Permissions.CanDeleteOperations);
                        permissions.Add(Permissions.CanViewOperations);
                        // Settings
                        permissions.Add(Permissions.CanViewSettings);
                        permissions.Add(Permissions.CanEditSettings);
                        // Dashboard
                        permissions.Add(Permissions.CanViewDashboard);
                        break;
                    
                    case Roles.FamilyMember:
                        // Settings
                        permissions.Add(Permissions.CanViewSettings);
                        // Dashboard
                        permissions.Add(Permissions.CanViewDashboard);
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