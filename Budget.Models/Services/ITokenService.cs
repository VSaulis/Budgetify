namespace Budget.Models.Services
{
    public interface ITokenService
    {
        string GenerateRefreshToken();
        string GenerateToken(int id);
    }
}