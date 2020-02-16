using System.ComponentModel.DataAnnotations;

namespace Budget.Contracts.Group
{
    public class AddGroupRequest : BaseRequest
    {
        [Required]
        public string Name { get; set; }
    }
}