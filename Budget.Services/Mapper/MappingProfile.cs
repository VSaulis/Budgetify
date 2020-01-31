using AutoMapper;
using Budget.Contracts.Category;
using Budget.Contracts.Operation;
using Budget.Contracts.User;
using Budget.Dtos.Authentication;
using Budget.Dtos.Category;
using Budget.Dtos.Operation;
using Budget.Dtos.User;
using Budget.Models;
using Budget.Services.Mapper.Resolvers;

namespace Budget.Services.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LoggedUser, LoggedUserDto>()
                .ForMember(
                    dest => dest.Email,
                    opt => opt.MapFrom(src => src.User.Email)
                )
                .ForMember(
                    dest => dest.Roles,
                    opt => opt.MapFrom(src => src.User.Roles)
                )
                .ForMember(
                    dest => dest.RefreshToken,
                    opt => opt.MapFrom(src => src.User.RefreshToken)
                );

            CreateMap<User, LoggedUser>()
                .ForMember(
                    dest => dest.User,
                    opt => opt.MapFrom(src => src)
                )
                .ForMember(
                    dest => dest.Permissions,
                    opt => opt.MapFrom<PermissionsResolver>()
                );

            CreateMap<User, UsersListItemDto>();
            CreateMap<User, UserDto>();
            CreateMap<AddUserRequest, User>();
            
            CreateMap<Category, CategoriesListItemDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<AddCategoryRequest, Category>();
            
            CreateMap<Operation, OperationsListItemDto>();
            CreateMap<Operation, OperationDto>();
            CreateMap<AddOperationRequest, Operation>();
        }
    }
}