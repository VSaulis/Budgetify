using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.Group;
using Budget.Dtos.Group;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Models.Services;
using NotImplementedException = System.NotImplementedException;

namespace Budget.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IAuthenticationService _authenticationService;
        private readonly IGroupUserRepository _groupUserRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public GroupService(IGroupRepository groupRepository, IMapper mapper, IUnitOfWork unitOfWork, IAuthenticationService authenticationService, IGroupUserRepository groupUserRepository)
        {
            _groupUserRepository = groupUserRepository;
            _authenticationService = authenticationService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _groupRepository = groupRepository;
        }

        public async Task<BaseResponse> AddAsync(AddGroupRequest request)
        {
            var loggedUser = await _authenticationService.GetLoggedUserAsync();

            var group = _mapper.Map<AddGroupRequest, Group>(request);
            await _groupRepository.AddAsync(group);

            var groupUser = new GroupUser
                {UserId = loggedUser.User.Id, Roles = new List<Roles> {Roles.Owner}, Group = group};
            await _groupUserRepository.AddAsync(groupUser);

            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> EditAsync(EditGroupRequest request)
        {
            var group = await _groupRepository.GetAsync(group => group.Id == request.Id);
            if (group == null) return new BaseResponse("Group is not found");

            group.Name = request.Name;
            _groupRepository.Update(group);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<ListResponse<GroupsListItemDto>> ListAsync(ListGroupsRequest request)
        {
            var loggedUser = await _authenticationService.GetLoggedUserAsync();

            var paging = _mapper.Map<ListGroupsRequest, Paging>(request);
            var sort = _mapper.Map<ListGroupsRequest, Sort>(request);
            var filter = _mapper.Map<ListGroupsRequest, GroupsFilter>(request);
            filter.UserId = loggedUser.User.Id;

            var groups = await _groupRepository.GetListAsync(filter, sort, paging);
            var groupsCount = await _groupRepository.CountAsync(filter);

            var groupsDtosList = _mapper.Map<List<Group>, List<GroupsListItemDto>>(groups);
            return new ListResponse<GroupsListItemDto>(groupsDtosList, groupsCount);
        }

        public async Task<BaseResponse> DeleteAsync(int id)
        {
            var group = await _groupRepository.GetAsync(group => group.Id == id);
            if (group == null) return new BaseResponse("Group is not found");

            _groupRepository.Delete(group);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<ResultResponse<GroupDto>> GetAsync(int id)
        {
            var group = await _groupRepository.GetAsync(group => group.Id == id);
            if (group == null) return new ResultResponse<GroupDto>("Group is not found");

            var groupDto = _mapper.Map<Group, GroupDto>(group);
            return new ResultResponse<GroupDto>(groupDto);
        }
    }
}