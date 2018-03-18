using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Models.ActionModel;
using HuRe.Models.ResultModels;
using HuRe.Repositories;
using Microsoft.AspNetCore.Mvc;
using HuRe.Util;
using Service.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace HuRe.Controllers
{
    [Route("api/companies")]
    public class CompaniesController : Controller
    {
        private readonly ICompanyRepository _companiesRepo;
        private readonly IRepository<Job> _jobRepo;
        private readonly IAccountRepository _accountRepo;
        private readonly IFileService _fileService;
        public CompaniesController(ICompanyRepository companiesRepo, IRepository<Job> jobRepo, IFileService fileService,
        IAccountRepository accountRepo)
        {
            _companiesRepo = companiesRepo;
            _jobRepo = jobRepo;
            _accountRepo = accountRepo;
            _fileService = fileService;
        }
        [HttpGet("{userId}/job-of-company-of-user")]
        [Authorize]
        public async Task<IEnumerable<Job>> GetJobOfCompanyOfUser(long userId)
        {
            var company = (await _accountRepo.GetAsync(userId)).CompanyId;
            if (company == null)
            {
                return new List<Job>();
            }
            //get all job from repo company
            var jobs = await _companiesRepo.GetAll();
            var jobOfCompany = jobs.Where(z => z.CompanyId == company);
            return jobOfCompany;
        }
        [HttpGet("all")]
        public async Task<IEnumerable<Company>> Gets()
        {
            return await _companiesRepo.GetsAsync(); ;
        }
        [HttpGet("{id}")]
        public async Task<Company> Get(long id)
        {
            Company doanhNghiep = await _companiesRepo.GetAsync(id);
            return doanhNghiep;
        }
        [HttpGet("{id}/jobs")]
        public async Task<IEnumerable<Job>> GetJob(long id)
        {
            var jobs = await _jobRepo.GetsAsync();
            return jobs.Where(o => o.CompanyId == id);
        }
        [HttpGet("page/{page}")]
        public async Task<object> GetPage(int page)
        {
            var doanhNghieps = await _companiesRepo.GetsAsync();
            var data = doanhNghieps.OrderByDescending(o => o.Scales).Skip(page * 10).Take(10).ToList();
            return new
            {
                itemCount = doanhNghieps.Count(),
                data = data
            };
        }
        [HttpGet("search-page/{page}")]
        public async Task<object> GetSearchPage(int page, string keyword)
        {
            var doanhNghieps = await _companiesRepo.GetsAsync();
            if (keyword != null)
            {
                doanhNghieps = doanhNghieps.Where(z => z.Name.ToUpper().Contains(keyword.ToUpper().Trim()));
            }
            return new
            {
                itemCount = doanhNghieps.Count(),
                data = doanhNghieps.Skip(page * 10).Take(10).ToList()
            };
        }
        [HttpGet]
        public async Task<IEnumerable<Company>> GetPage()
        {
            var doanhNghieps = await _companiesRepo.GetsAsync();
            return doanhNghieps.OrderByDescending(o => o.Scales).Take(5).ToList();
        }
        [HttpGet("partner")]
        public async Task<IEnumerable<Company>> GetPartner()
        {
            var doanhNghieps = await _companiesRepo.GetsAsync();
            return doanhNghieps.Where(z => z.IsPartner && z.Status.ToUpper() == "ACTIVE").OrderByDescending(o => o.Scales).Take(10).ToList();
        }
        [HttpDelete("{id}")]
        public async Task<bool> Delete(long id)
        {
            bool isDeleted = await _companiesRepo.RemoveAsync(id);
            return isDeleted;
        }

        [HttpPost]
        public async Task<bool> Post([FromBody] Company model)
        {
            bool isAdded = await _companiesRepo.AddAsync(model);
            return isAdded;
        }

        [HttpPut("{id}")]
        public async Task<bool> Put(long id, [FromBody] Company model)
        {
            bool isUpdated = await _companiesRepo.UpdateAsync(id, model);
            return isUpdated;
        }

        #region api dung cho admin
        [HttpPost("page")]
        [Authorize(Policy = "Admin")]
        public async Task<ModelPaging<Company>> Post([FromBody]FilterPageActionModel form)
        {
            //var total = _companiesRepo.CountAll(form);
            var Companys = await _companiesRepo.GetsAsync();
            //var Companys = await _companiesRepo.GetsAsyncPage(form);
            if (form.KeySearch != null)
            {
                Companys = Companys.Where(a => a.Name.Contains(form.KeySearch) || a.ShortName.Contains(form.KeySearch)).ToList();
            }
            if (form.Status != null)
            {
                Companys = Companys.Where(a => a.Status == form.Status).ToList();
            }
            if (form.IsPartner == 1)
            {
                Companys = Companys.Where(a => a.IsPartner == true).ToList();
            }
            else if (form.IsPartner == 2)
            {
                Companys = Companys.Where(a => a.IsPartner == false).ToList();
            }
            var total = Companys.Count();
            var ofsset = (form.CurrentPage * form.NumberItemPage) - form.NumberItemPage;
            Companys = Companys.Skip(ofsset).Take(form.NumberItemPage).ToList();
            return new ModelPaging<Company>
            {
                total = total,
                data = Companys
            };
        }
        [HttpPost("create")]
        [Authorize(Policy = "Admin")]
        public async Task<bool> Create([FromBody]Company form)
        {
            return await _companiesRepo.AddAsync(form);
        }
        [HttpPut("update/{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<bool> Update(long id, [FromBody]Company form)
        {
            return await _companiesRepo.UpdateAsync(id, form);
        }
        //da co
        [HttpGet("info/{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<Company> GetInfo(long id)
        {
            return await _companiesRepo.GetAsync(id);
        }
        //da co
        [HttpDelete("delete/{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<bool> DeleteAdmin(long id)
        {
            var item = await _companiesRepo.GetAsync(id);
            if (_fileService.DeleteFile(item.URLLogo))
            {
                return await _companiesRepo.RemoveAsync(id);
            }
            else
            {
                return false;
            }

        }
        [HttpPut("activate/{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<bool> Activate(int id, [FromBody]Company form)
        {
            return await _companiesRepo.UpdateAsync(id, form);
        }
        #endregion
    }
}