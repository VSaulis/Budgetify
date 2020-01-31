using System.Collections.Generic;
using AutoMapper;
using Budget.Constants.Enums;
using Budget.Models;
using Budget.Models.Services;

namespace Budget.Services.Mapper.Resolvers
{
    public class PermissionsResolver : IValueResolver<User, object, List<Permissions>>
    {
        private readonly IPermissionsService _permissionsService;

        public PermissionsResolver(IPermissionsService permissionsService)
        {
            _permissionsService = permissionsService;
        }

        public List<Permissions> Resolve(User user, object destination, List<Permissions> destMember, ResolutionContext context)
        {
            return _permissionsService.GetPermissions(user.Roles);
        }
    }
}