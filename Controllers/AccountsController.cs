using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Models.ActionModel;
using HuRe.ResultModels;
using Microsoft.AspNetCore.Mvc;
using Service.Repositories;
using HuRe.Models.ResultModels;
using HuRe.Util;
using Microsoft.AspNetCore.Authorization;

namespace HuRe.Controllers
{
    [Route("api/accounts")]
    [Authorize]
    public class AccountsController : Controller
    {
        private readonly IAccountRepository _accountRepo;
        public AccountsController(IAccountRepository accountsRepo)
        {
            _accountRepo = accountsRepo;
        }
        [HttpPost]
        public async Task<ModelPaging<AccountResult>> Post([FromBody]FilterPageActionModel form)
        {
            var total = _accountRepo.CountAll(form);
            var accounts = await _accountRepo.GetsAsyncPage(form);
            return new ModelPaging<AccountResult>
            {
                total = total,
                data = accounts
            };
        }
        [HttpPost("create")]
        public async Task<bool> Create([FromBody]Account form)
        {
            //set pass default 
            form.PasswordHashed = Protector.HashPassword("0123456789");
            return await _accountRepo.AddAsync(form);
        }
        [HttpPut("activate/{guid}")]
        public async Task<bool> Activate(Guid guid, [FromBody]Account form)
        {
            return await _accountRepo.ActivateAccount(guid, form);
        }
        [HttpPost("update")]
        public async Task<bool> Update([FromBody]Account form)
        {
            return await _accountRepo.UpdateAsync(form);
        }
        [HttpGet("{Guid}")]
        public async Task<Account> Get(Guid Guid)
        {
            return await _accountRepo.GetAsync(Guid);
        }
        [HttpDelete("{guid}")]
        public async Task<bool> Delete(Guid guid)
        {
            return await _accountRepo.RemoveAsync(guid);
        }
    }
}