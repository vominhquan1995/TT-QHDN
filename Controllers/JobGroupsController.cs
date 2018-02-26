using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Models.ActionModel;
using HuRe.Models.ResultModels;
using HuRe.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Repositories;

namespace HuRe.Controllers
{
    [Route("api/job-groups")]
    public class JobGroupsController : Controller
    {
        private readonly IJobGroupRepository _jobGroupRepo;
        public JobGroupsController(IJobGroupRepository jobGroupRepo)
        {
            _jobGroupRepo = jobGroupRepo;
        }
        [HttpGet]
        public async Task<List<JobGroup>> Gets()
        {
            var jobGroups = await _jobGroupRepo.GetsAsync();
            return jobGroups.ToList();
        }
        [HttpPost]
        [Authorize]
        public async Task<ModelPaging<JobGroup>> Post([FromBody]FilterPageActionModel form)
        {
            var total = _jobGroupRepo.CountAll(form);
            var jobGroups = await _jobGroupRepo.GetsAsyncPage(form);
            return new ModelPaging<JobGroup>
            {
                total = total,
                data = jobGroups
            };
        }
        [HttpPost("create")]
        [Authorize]
        public async Task<bool> Create([FromBody]JobGroup form)
        {
            return await _jobGroupRepo.AddAsync(form);
        }
        [HttpPut("update/{id}")]
        [Authorize]
        public async Task<bool> Update(long id, [FromBody]JobGroup form)
        {
            return await _jobGroupRepo.UpdateAsync(id, form);
        }
        [HttpGet("info/{id}")]
        public async Task<JobGroup> Get(long id)
        {
            return await _jobGroupRepo.GetAsync(id);
        }
        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<bool> Delete(long id)
        {
            return await _jobGroupRepo.RemoveAsync(id);
        }
        [HttpGet("all")]
        public async Task<IEnumerable<JobGroup>> getAll()
        {
            return await _jobGroupRepo.GetsAsync();
        }
    }
}