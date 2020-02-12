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
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Models.Services;

namespace Budget.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUserRepository userRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<BaseResponse> AddAsync(AddUserRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Email == request.Email);
            if (user != null) return new BaseResponse("User with this email is already exist");

            user = _mapper.Map<AddUserRequest, User>(request);
            await _userRepository.AddAsync(user);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> EditAsync(EditUserRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Id == request.Id);
            if (user == null) return new BaseResponse("User is not found");

            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Roles = request.Roles.Select(Enum.Parse<Roles>).ToList();

            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> HardDeleteAsync(int id)
        {
            var user = await _userRepository.GetAsync(user => user.Id == id);
            if (user == null) return new BaseResponse("User is not found");

            _userRepository.HardDelete(user);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> DeleteAsync(int id)
        {
            var user = await _userRepository.GetAsync(user => user.Id == id);
            if (user == null) return new BaseResponse("User is not found");

            _userRepository.Delete(user);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<ResultResponse<UserDto>> GetAsync(int id)
        {
            var user = await _userRepository.GetAsync(user => user.Id == id);
            if (user == null) return new ResultResponse<UserDto>("User is not found");
            var userDto = _mapper.Map<User, UserDto>(user);
            return new ResultResponse<UserDto>(userDto);
        }

        public async Task<BaseResponse> DeleteListAsync(DeleteUsersRequest request)
        {
            foreach (var userId in request.UsersIds)
            {
                var user = await _userRepository.GetAsync(user => user.Id == userId);
                if (user == null) return new BaseResponse(message: $"User with id : {userId} is not found");
                _userRepository.Delete(user);
            }

            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<ListResponse<UsersListItemDto>> ListAsync(ListUsersRequest request)
        {
            var paging = _mapper.Map<ListUsersRequest, Paging>(request);
            var sort = _mapper.Map<ListUsersRequest, Sort>(request);
            var filter = _mapper.Map<ListUsersRequest, UsersFilter>(request);

            var users = await _userRepository.GetListAsync(filter, sort, paging);
            var usersCount = await _userRepository.CountAsync(filter);

            var usersDtosList = _mapper.Map<List<User>, List<UsersListItemDto>>(users);
            return new ListResponse<UsersListItemDto>(usersDtosList, usersCount);
        }
    }
}