namespace Budget.Contracts.Category
{
    public class ListCategoriesRequest : ListRequest
    {
        public decimal? TotalFrom { get; set; }
        public decimal? TotalTo { get; set; }
        public bool? Deleted { get; set; }
    }
}