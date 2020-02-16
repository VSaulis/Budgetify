using System.Collections.Generic;
using Budget.Dtos.User;

namespace Budget.Dtos.Group
{
    public class GroupsListItemDto : BaseDto
    {
        public string Name { get; set; }
        public List<UsersListItemDto> Users { get; set; }
        public decimal TodayBalance { get; set; }
        public decimal TotalBalance { get; set; }
    }
}