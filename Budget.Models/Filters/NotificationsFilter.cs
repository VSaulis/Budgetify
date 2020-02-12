namespace Budget.Models.Filters
{
    public class NotificationsFilter : BaseFilter
    {
        public int? NotifierId { get; set; }
        public int? ReceiverId { get; set; }
    }
}