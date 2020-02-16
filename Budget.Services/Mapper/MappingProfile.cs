﻿using System;
using System.Linq;
using AutoMapper;
using Budget.Contracts;
using Budget.Contracts.Category;
using Budget.Contracts.Group;
using Budget.Contracts.Notification;
using Budget.Contracts.Operation;
using Budget.Contracts.User;
using Budget.Dtos.Authentication;
using Budget.Dtos.Category;
using Budget.Dtos.Group;
using Budget.Dtos.Notification;
using Budget.Dtos.Operation;
using Budget.Dtos.Profile;
using Budget.Dtos.User;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Services.Mapper.Resolvers;
using Budget.System.Extensions;

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

            CreateMap<User, LoggedUser>()
                .ForMember(
                    dest => dest.User,
                    opt => opt.MapFrom(src => src)
                )
                .ForMember(
                    dest => dest.Permissions,
                    opt => opt.MapFrom<PermissionsResolver>()
                );

            CreateMap<User, UsersListItemDto>()
                .ForMember(
                    dest => dest.Initials,
                    opt => opt.MapFrom(src => src.Initials())
                );
            
            CreateMap<User, UserDto>()
                .ForMember(
                    dest => dest.Initials,
                    opt => opt.MapFrom(src => src.Initials())
                );
            
            CreateMap<ListUsersRequest, UsersFilter>();
            CreateMap<AddUserRequest, User>();

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
            CreateMap<User, ProfileDto>()
                .ForMember(
                    dest => dest.Initials,
                    opt => opt.MapFrom(src => src.Initials())
                );
            
            CreateMap<ListNotificationsRequest, NotificationsFilter>();
            
            CreateMap<AddNotificationRequest, Notification>();
            CreateMap<Notification, NotificationDto>()
                .ForMember(
                    dest => dest.Type,
                    opt => opt.MapFrom(src => src.Type.GetDescription())
                );
            
            // Group
            
            CreateMap<AddGroupRequest, Group>();
            CreateMap<ListGroupsRequest, GroupsFilter>();
            CreateMap<Group, GroupDto>();
            CreateMap<Group, GroupsListItemDto>()
            .ForMember(
                dest => dest.Users,
                opt => opt.MapFrom(src => src.GroupUsers.Select(groupUser => groupUser.User))
            )
            .ForMember(
                dest => dest.TodayBalance,
                opt => opt.MapFrom(src => src.TodayBalance())
            )
            .ForMember(
                dest => dest.TotalBalance,
                opt => opt.MapFrom(src => src.TotalBalance())
            );
        }
    }
}