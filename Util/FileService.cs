using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Text;

namespace HuRe.Util
{
    public interface IFileService
    {
        string UploadFile(IFormFile file);
        string CreateFileHmtl(string html);
        bool DeleteFile(string path);
    }
    public class FileService : IFileService
    {
        private IHostingEnvironment _evn;
        public FileService(IHostingEnvironment evn)
        {
            _evn = evn;
        }
        public string UploadFile(IFormFile file)
        {
            var datetime = DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss");
            var filename = datetime + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var url = "/FilesUploaded/" + filename;
            var rootPath = _evn.WebRootPath.ToString() + "/FilesUploaded";
            filename = rootPath + "/" + filename;
            if (!Directory.Exists(rootPath))
            {
                Directory.CreateDirectory(rootPath);
            }
            using (FileStream fs = System.IO.File.Create(filename))
            {
                file.CopyTo(fs);
                fs.Flush();
            }
            return url;
        }
        public string CreateFileHmtl(string html)
        {
            var datetime = DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss");
            var rootPath = _evn.WebRootPath.ToString() + "/templateJob";
            if (!Directory.Exists(rootPath))
            {
                Directory.CreateDirectory(rootPath);
            }
            var url = "templateJob/" + datetime + ".html";
            var filename = rootPath + "/" + datetime + ".html";
            using (FileStream fs = new FileStream(filename, FileMode.Create))
            {
                using (StreamWriter w = new StreamWriter(fs, Encoding.UTF8))
                {
                    w.Write(html);
                }
            }
            return url;
        }
        public bool DeleteFile(string path)
        {
            try
            {
                var firstChar = path.Substring(0, 1);
                if(firstChar == "/")
                {
                    path = _evn.WebRootPath.ToString() + path;
                }
                else
                {
                    path = _evn.WebRootPath.ToString() + "/" + path;
                }
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}