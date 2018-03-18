using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Repositories;
using Microsoft.AspNetCore.Mvc;
using HuRe.Models.ResultModels;
using HuRe.Models.ActionModel;
using Service.Repositories;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HuRe.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class AppliesController : Controller
    {
        private readonly IApplyRepository _appliesRepo;
        private readonly IRepository<Job> job;
        private readonly IAccountRepository account;
        public AppliesController(IApplyRepository appliesRepo, IAccountRepository a, IRepository<Job> j)
        {
            _appliesRepo = appliesRepo;
            account = a;
            job = j;
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<Apply> GetList([FromQuery]long accountId, long jobId)
        {
            return await _appliesRepo.GetApply(accountId, jobId);
        }
        [HttpPost]
        public async Task<object> Post([FromBody] Apply model)
        {
            var accs = await account.GetsAsync();
            var a = accs.FirstOrDefault(z => z.Id == model.AccountId);
            if (a.CV == null)
            {
                return new { Message = "CV" };
            }
            if (a.PhoneNumber == null || a.PhoneNumber?.Length == 0)
            {
                return new { Message = "Phone" };
            }
            var isAdded = await _appliesRepo.AddAsync(model);
            if (isAdded)
            {
                var j = await job.GetAsync(model.JobId);
                j.AppliedCount++;
                await job.UpdateAsync(j.Id, j);
                return new { Message = "Created" };
            }
            else
            {
                return new { Message = "Failed" };
            }
        }
        [HttpGet("{id}/user-applies")]
        public async Task<IEnumerable<Job>> GetAppliesOfUser(long id)
        {
            var appliesOfUser = await _appliesRepo.GetAppliesOfAccount(id);
            return appliesOfUser.Select(z => z.Job);
        }
        [HttpGet("user-applies-job/{id}")]
        public async Task<IEnumerable<Account>> GetUserAppliesOfJob(long id)
        {
            var userOfJob = await _appliesRepo.GetUsersApply(id);
            return userOfJob.Select(z => z.Account);
        }
        #region admin
        [HttpPost("page")]
        [Authorize(Policy = "Admin")]
        public async Task<ModelPaging<Apply>> Post([FromBody]FilterPageActionModel body)
        {
            var Applies = await _appliesRepo.GetAll();
            if (body.KeySearch != null)
            {
                Applies = Applies.Where(a => a.Account.FullName.Contains(body.KeySearch)).ToList();
            }
            if (body.Status != null)
            {
                Applies = Applies.Where(a => a.Status == body.Status).ToList();
            }
            if (body.Company_Id != 0)
            {
                Applies = Applies.Where(a => a.Job.CompanyId == body.Company_Id).ToList();
            }
            var total = Applies.Count();
            var ofsset = (body.CurrentPage * body.NumberItemPage) - body.NumberItemPage;
            Applies = Applies.Skip(ofsset).Take(body.NumberItemPage).ToList();
            return new ModelPaging<Apply>
            {
                total = total,
                data = Applies
            };
        }
        [HttpGet("info/{accountId}/{jobId}")]
        public async Task<Apply> GetInfo(long accountId, long jobId)
        {
            return await _appliesRepo.GetInfo(accountId, jobId);
        }
        [HttpDelete("delete/{accountId}/{jobId}")]
        public async Task<bool> DeleteItem(long accountId, long jobId)
        {
            return await _appliesRepo.DeleteAsync(accountId, jobId);
        }
        [HttpPut("update-progress/{id}")]
        public async Task<bool> UpdateProgress(int id, [FromBody]Apply form)
        {
            return await _appliesRepo.UpdateProgress(id, form.JobId, form.Status);
        }
        #endregion
    }
}
