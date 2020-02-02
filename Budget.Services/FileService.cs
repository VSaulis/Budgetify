using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Models.Services;

namespace Budget.Services
{
    public class FileService : IFileService
    {
        private readonly string _documentsPath;
        private readonly string _avatarsPath;

        public FileService()
        {
            _documentsPath = "aaa";
            _avatarsPath = "bbb";
        }
        
        public async Task<string> UploadBase64FileAsync(string data, FileTypes fileType)
        {
            var dataUrl = Regex.Match(data, @"data:image/(?<extension>.+?);base64,(?<data>.+)");
            var extension = dataUrl.Groups["extension"].Value;
            var base64String = dataUrl.Groups["data"].Value;
            var base64Bytes = Convert.FromBase64String(base64String);

            var fileName = Guid.NewGuid() + extension;
            var path = Path.Combine(fileType == FileTypes.Avatar ? _avatarsPath : _documentsPath, fileName);
            
            await File.WriteAllBytesAsync(path, base64Bytes);
            return path;
        }

        public async Task DeleteFile(string fileName)
        {
            File.Delete(fileName);
        }
    }
}