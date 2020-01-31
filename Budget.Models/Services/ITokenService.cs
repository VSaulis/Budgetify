namespace Budget.Models.Services
{
    public interface ITokenService
    {
        public string GenerateRefreshToken();
        public string GenerateToken(int id);
    }
}