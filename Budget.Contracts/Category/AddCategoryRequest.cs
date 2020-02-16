namespace Budget.Contracts.Category
{
    public class AddCategoryRequest : BaseRequest
    {
        public int GroupId { get; set; }
        public string Name { get; set; }
    }
}