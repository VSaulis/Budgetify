using System;

namespace Budget.Dtos
{
    public class BaseDto
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
    }
}