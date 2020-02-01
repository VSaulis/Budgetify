﻿namespace Budget.Contracts.Authentication
{
    public class ChangePasswordRequest : BaseRequest
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}