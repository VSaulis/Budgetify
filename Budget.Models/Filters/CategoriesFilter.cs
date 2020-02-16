namespace Budget.Models.Filters
{
    public class CategoriesFilter : BaseFilter
    {
        public int? GroupId { get; set; }
        public decimal? TotalFrom { get; set; }
        public decimal? TotalTo { get; set; }
    }
}