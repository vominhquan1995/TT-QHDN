using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace HuRe.Controllers
{
    [Route("api/upload-file")]
    [Authorize]
    public class FileUploadController : Controller
    {
        private readonly IFileService _fileService;
        public FileUploadController(IFileService fileService)
        {
            _fileService = fileService;
        }
        [HttpPost]
        public IActionResult UploadImage()
        {
            var httpRequest = HttpContext.Request.Form;
            if (httpRequest.Files.Count > 0)
            {
                var url = _fileService.UploadFile(httpRequest.Files[0]);
                if (!string.IsNullOrEmpty(url))
                {
                    return new JsonResult(url);
                }
            }
            return BadRequest();
        }
    }
}