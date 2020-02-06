namespace Budget.Models.Filters
{
    public class CategoriesFilter : BaseFilter
    {
        public decimal? TotalFrom { get; set; }
        public decimal? TotalTo { get; set; }
    }
}