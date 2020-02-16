using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Budget.Models
{
    public class Group : BaseModel
    {
        [Required]
        public string Name { get; set; }
        
        public List<GroupUser> GroupUsers { get; set; } 
        public List<Category> Categories { get; set; }
        public List<Invitation> Invitations { get; set; }

        public decimal TotalBalance()
        {
            return Categories.Select(category => category.Operations.Sum(operation => operation.Amount)).Sum();
        }

        public decimal TodayBalance()
        {
            return Categories.Select(category => category.Operations.Where(operation => operation.Date.Date == DateTime.Now.Date).Sum(operation => operation.Amount)).Sum();
        }
    }
}