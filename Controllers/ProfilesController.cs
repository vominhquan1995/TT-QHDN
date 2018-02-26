using System;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Models.ActionModel;
using HuRe.Repositories;
using HuRe.ResultModels;
using HuRe.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Repositories;

namespace HuRe.Controllers
{
    [Route("api/profiles")]
    [Authorize]
    public class ProfilesController : Controller
    {
        private readonly IAccountRepository _accountRepo;
        private readonly ICompanyRepository _companyRepo;
        private readonly IRepository<CV> _cvRepo;
        public ProfilesController(IAccountRepository accountsRepo, IRepository<CV> cvRepo,
        ICompanyRepository companyRepo)
        {
            _accountRepo = accountsRepo;
            _cvRepo = cvRepo;
            _companyRepo = companyRepo;
        }
        [HttpGet("{guid}")]
        public async Task<AccountInfo> GetPublic(string guid)
        {
            var accountExist = await _accountRepo.GetAsync(Guid.Parse(guid));
            return new AccountInfo
            {
                Username = accountExist.Username,
                Avatar = accountExist.Avatar
            };
        }
        [HttpPost("profiles")]
        public async Task<Account> Post([FromBody] Guid guid)
        {
            return await _accountRepo.GetAsync(guid);
        }
        [HttpPost]
        public async Task<Account> Post([FromBody] Account model)
        {
            var isUpdate = await _accountRepo.UpdateAsync(model);
            if (isUpdate)
            {
                return model;
            }
            else
            {
                return new Account();
            }
        }
        [HttpPost("cv")]
        public async Task<CV> UpdateCV([FromBody] CV model)
        {
            bool result = false;
            if (model.Id == 0)
            {
                result = await _cvRepo.AddAsync(model);

            }
            else
            {
                result = await _cvRepo.UpdateAsync(model.Id, model);
            }
            return model;
        }

        [HttpPost("company")]
        public async Task<Company> UpdateCompany([FromBody] Company model)
        {
            bool result = await _companyRepo.UpdateAsync(model.Id, model);
            return result ? model : new Company();
        }
        [HttpPost("{guid}/update-password")]
        public async Task<IActionResult> Post([FromBody]UpdatePasswordModel model, Guid guid)
        {
            var result = await _accountRepo.ChangePassword(guid, model);
            if (result)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}