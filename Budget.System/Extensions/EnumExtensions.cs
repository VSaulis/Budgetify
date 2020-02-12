using System;
using System.ComponentModel;

namespace Budget.System.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum value)
        {
            var type = value.GetType();
            var name = Enum.GetName(type, value);
            if (name == null) return value.ToString();

            var field = type.GetField(name);
            if (field == null) return value.ToString();

            if (Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) is DescriptionAttribute attr)
            {
                return attr.Description;
            }
            
            return value.ToString();
        }
    }
}