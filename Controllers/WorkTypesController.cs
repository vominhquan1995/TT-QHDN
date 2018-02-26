using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Models.ActionModel;
using HuRe.Models.ResultModels;
using HuRe.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HuRe.Controllers
{
    [Route("api/work-types")]
    public class WorkTypesController : Controller
    {
        private readonly IWorkTypeRepository _workTypeRepo;
        public WorkTypesController(IWorkTypeRepository workTypeRepo)
        {
            _workTypeRepo = workTypeRepo;
        }
        [HttpGet]
        public async Task<List<WorkType>> Gets()
        {
            var WorkTypes = await _workTypeRepo.GetsAsync();
            return WorkTypes.ToList();
        }
        [HttpPost]
        [Authorize]
        public async Task<ModelPaging<WorkType>> Post([FromBody]FilterPageActionModel form)
        {
            var total = _workTypeRepo.CountAll(form);
            var WorkTypes = await _workTypeRepo.GetsAsyncPage(form);
            return new ModelPaging<WorkType>
            {
                total = total,
                data = WorkTypes
            };
        }
        [HttpPost("create")]
        [Authorize]
        public async Task<bool> Create([FromBody]WorkType form)
        {
            return await _workTypeRepo.AddAsync(form);
        }
        [HttpPut("update/{id}")]
        [Authorize]
        public async Task<bool> Update(long id, [FromBody]WorkType form)
        {
            return await _workTypeRepo.UpdateAsync(id, form);
        }
        [HttpGet("info/{id}")]
        public async Task<WorkType> Get(long id)
        {
            return await _workTypeRepo.GetAsync(id);
        }
        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<bool> Delete(long id)
        {
            return await _workTypeRepo.RemoveAsync(id);
        }
        [HttpGet("all")]
        public async Task<IEnumerable<WorkType>> getAll()
        {
            return await _workTypeRepo.GetsAsync();
        }
    }
}