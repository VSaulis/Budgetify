﻿namespace Budget.Constants.Enums
{
    public enum Permissions
    {
        // Users
        CanViewUsers,
        CanAddUsers,
        CanDeleteUsers,
        CanEditUsers,
        CanHardDeleteUsers,
        
        // Categories
        CanViewCategories,
        CanAddCategories,
        CanDeleteCategories,
        CanEditCategories,
        CanHardDeleteCategories,
        
        // Operations
        CanViewOperations,
        CanAddOperations,
        CanDeleteOperations,
        CanEditOperations,
        CanHardDeleteOperations,

        // Dashboard
        CanViewStatistics,
        
        // Settings
        CanViewSettings,
        CanEditSettings
    }
}