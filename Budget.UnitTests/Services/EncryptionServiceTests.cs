using Budget.Models.Services;
using Budget.Services;
using Xunit;

namespace Budget.UnitTests.Services
{
    public class EncryptionServiceTests
    {
        private readonly IEncryptionService _encryptionService;
        private const int SaltLength = 16;
        private const int HashLength = 32;

        public EncryptionServiceTests()
        {
            _encryptionService = new EncryptionService();
        }

        [Fact]
        public void Should_Generate_Salt()
        {
            var salt = _encryptionService.CreateSalt();
            Assert.NotNull(salt);
            Assert.Equal(SaltLength, salt.Length);
        }
        
        [Fact]
        public void Should_Generate_Hash()
        {
            var hashString = "password";
            var salt = _encryptionService.CreateSalt();
            var hash = _encryptionService.CreateHash(hashString, salt);
            Assert.NotNull(hash);
            Assert.Equal(HashLength, hash.Length);
        }
        
        [Fact]
        public void Should_Verify_Valid_Hash()
        {
            var hashString = "password";
            var salt = _encryptionService.CreateSalt();
            var hash = _encryptionService.CreateHash(hashString, salt);

            var isValid = _encryptionService.VerifyHash(hashString, hash, salt);
            Assert.True(isValid);
        }
        
        [Fact]
        public void Should_Reject_Invalid_Hash()
        {
            var hashString = "password";
            var salt = _encryptionService.CreateSalt();
            var hash = _encryptionService.CreateHash(hashString, salt);

            var isValid = _encryptionService.VerifyHash("password1", salt, hash);
            Assert.False(isValid);
        }
    }
}