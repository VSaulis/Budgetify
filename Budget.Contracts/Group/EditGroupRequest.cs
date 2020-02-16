using System;

namespace Budget.Contracts.Group
{
    public class EditGroupRequest : BaseRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? Version { get; set; }
    }
}