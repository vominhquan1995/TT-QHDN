using HuRe.Models;
using HuRe.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using HuRe.Util;
using Microsoft.AspNetCore.Authorization;

namespace TT_QHDN.Controllers
{
    [Route("api/slides")]
    public class SlideController : Controller
    {
        private readonly IRepository<Slide> _slideRepo;
        private readonly IFileService _fileService;
        public SlideController(IRepository<Slide> slideRepo, IFileService fileService)
        {
            _slideRepo = slideRepo;
            _fileService = fileService;
        }
        [HttpGet]
        public async Task<IEnumerable<Slide>> Get()
        {
            var slides = await _slideRepo.GetsAsync();
            return slides.Where(x=>x.IsShow).OrderBy(x=>x.Index);
        }
        [HttpGet("all")]
        public async Task<IEnumerable<Slide>> GetAll()
        {
            var slides = await _slideRepo.GetsAsync();
            return slides.OrderBy(x => x.Index);
        }
        [HttpPost("create")]
        [Authorize]
        public async Task<bool> Create([FromBody]Slide form)
        {
            return await _slideRepo.AddAsync(form);
        }
        [HttpPut("update/{id}")]
        [Authorize]
        public async Task<bool> Update(long id, [FromBody]Slide form)
        {
            return await _slideRepo.UpdateAsync(id, form);
        }
        //da co
        [HttpGet("info/{id}")]
        [Authorize]
        public async Task<Slide> GetInfo(long id)
        {
            return await _slideRepo.GetAsync(id);
        }
        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<bool> DeleteAdmin(long id)
        {
            var item = await _slideRepo.GetAsync(id);
            if (_fileService.DeleteFile(item.ImageURL))
            {
                return await _slideRepo.RemoveAsync(id);
            }
            else
            {
                return false;
            }

        }
    }
}