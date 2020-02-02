using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.User;
using Budget.Dtos.User;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Models.Services;
using Budget.System.Helpers;

namespace Budget.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper, IFileService fileService)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _fileService = fileService;
        }
        
        public async Task<int> AddAsync(AddUserRequest request)
        {
            var user = _mapper.Map<AddUserRequest, User>(request);
            
            if (request.AvatarBase64String != null)
            {
                user.Avatar = await _fileService.UploadBase64FileAsync(request.AvatarBase64String, FileTypes.Avatar);
            }
            
            await _userRepository.AddAsync(user);
            return user.Id;
        }

        public async Task<int> EditAsync(EditUserRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Id == request.Id);
            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Roles = request.Roles.Select(Enum.Parse<Roles>).ToList();
            
            if (request.AvatarBase64String != null)
            {
                user.Avatar = await _fileService.UploadBase64FileAsync(request.AvatarBase64String, FileTypes.Avatar);
            }
            
            await _userRepository.UpdateAsync(user);
            return user.Id;
        }

        public async Task DeleteAsync(DeleteUserRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Id == request.Id);
            if (user.Avatar != null) await _fileService.DeleteFile(user.Avatar);
            await _userRepository.DeleteAsync(user);
        }

        public async Task<UserDto> GetAsync(GetUserRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Id == request.Id);
            return _mapper.Map<User, UserDto>(user);
        }
        
        public async Task DeleteListAsync(DeleteUsersRequest request)
        {
            foreach (var userId in request.UsersIds)
            {
                var user = await _userRepository.GetAsync(user => user.Id == userId);
                if (user.Avatar != null) await _fileService.DeleteFile(user.Avatar);
                await _userRepository.DeleteAsync(user);
            }
        }

        public async Task<ListResponse<UsersListItemDto>> ListAsync(ListUsersRequest request)
        {
            var paging = ListHelper.FormatPaging(request);
            var sort = ListHelper.FormatSort<User>(request);

            var users = await _userRepository.GetListAsync(null, sort, paging);
            var usersCount = await _userRepository.CountAsync(null);
            
            return new ListResponse<UsersListItemDto>
            {
                Result = _mapper.Map<List<User>, List<UsersListItemDto>>(users),
                Count = usersCount
            };
        }
    }
}