using System.ComponentModel;

namespace Budget.Constants.Enums
{
    public enum NotificationTypes
    {
        [Description("Add operation")]
        AddOperation,
        
        [Description("Edit operation")]
        EditOperation,
        
        [Description("Delete operation")]
        DeleteOperation,
        
        [Description("Add category")]
        AddCategory,
        
        [Description("Edit category")]
        EditCategory,
        
        [Description("Delete category")]
        DeleteCategory,
        
        [Description("Add user")]
        AddUser,
        
        [Description("Edit user")]
        EditUser,
        
        [Description("Delete user")]
        DeleteUser
    }
}