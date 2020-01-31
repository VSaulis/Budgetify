namespace Budget.Contracts
{
    public class ResultResponse<T> : BaseResponse
    {
        public T Result { get; set; }
    }
}