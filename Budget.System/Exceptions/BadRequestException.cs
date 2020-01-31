using System;
using System.Collections.Generic;

namespace Budget.System.Exceptions
{
    [Serializable]
    public class BadRequestException : Exception
    {
        public List<string> ValidationErrors { get; set; }
        
        public BadRequestException() : base("Bad request")
        {
        }
        
        public BadRequestException(List<string> validationErrors) : base("Bad request")
        {
            ValidationErrors = validationErrors;
        }

        public BadRequestException(string message) : base(message)
        {
        }
    }
}