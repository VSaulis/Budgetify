using System.Threading.Tasks;
using Budget.Constants.Enums;

namespace Budget.Models.Services
{
    public interface IFileService
    {
        Task<string> UploadBase64FileAsync(string data, FileTypes fileType);
        Task DeleteFile(string fileName);
    }
}