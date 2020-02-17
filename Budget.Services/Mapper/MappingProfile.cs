using System.Linq;
using AutoMapper;
using Budget.Contracts;
using Budget.Contracts.Category;
using Budget.Contracts.Operation;
using Budget.Dtos.Authentication;
using Budget.Dtos.Category;
using Budget.Dtos.Operation;
using Budget.Dtos.Profile;
using Budget.Models;
using Budget.Models.Filters;

namespace Budget.Services.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ListRequest, Paging>();
            CreateMap<ListRequest, Sort>()
                .ForMember(
                    dest => dest.Type,
                    opt => opt.MapFrom(src => src.SortType)
                )
                .ForMember(
                    dest => dest.Column,
                    opt => opt.MapFrom(src => src.SortColumn)
                );

            CreateMap<LoggedUser, LoggedUserDto>()
                .ForMember(
                    dest => dest.UserId,
                    opt => opt.MapFrom(src => src.User.Id)
                )
                .ForMember(
                    dest => dest.RefreshToken,
                    opt => opt.MapFrom(src => src.User.RefreshToken)
                );

            CreateMap<User, ProfileDto>()
                .ForMember(
                    dest => dest.Balance,
                    opt => opt.MapFrom(src => src.Categories.Select(category => category.Operations.Select(operation => operation.Amount).Sum()).Sum())
                );
            
            CreateMap<User, LoggedUser>()
                .ForMember(
                    dest => dest.User,
                    opt => opt.MapFrom(src => src)
                );

            CreateMap<Category, CategoriesListItemDto>()
                .ForMember(
                    dest => dest.Total,
                    opt => opt.MapFrom(src => src.Operations.Sum(operation => operation.Amount))
                );

            CreateMap<Category, CategoryDto>();
            CreateMap<ListCategoriesRequest, CategoriesFilter>();
            CreateMap<AddCategoryRequest, Category>();

            CreateMap<AddOperationRequest, Operation>();
            CreateMap<ListOperationsRequest, OperationsFilter>();
            CreateMap<Operation, OperationsListItemDto>();
            CreateMap<Operation, OperationDto>();
        }
    }
}