﻿using System.ComponentModel;

 namespace Budget.Constants.Enums
{
    public enum Roles
    {
        [Description("Owner")]
        Owner,
        
        [Description("Family member")]
        FamilyMember,
        
        [Description("Guest")]
        Guest
    }
}