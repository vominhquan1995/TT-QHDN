using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Models;
using HuRe.Models.ActionModel;
using HuRe.Models.ResultModels;
using HuRe.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using HuRe.Util;
using Microsoft.AspNetCore.Authorization;

namespace HuRe.Controllers
{
    [Route("api/jobs")]
    public class JobsController : Controller
    {
        private readonly IRepository<Job> _jobRepo;
        private readonly IApplyRepository _appliesRepo;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IFileService _serviceFile;
        public JobsController(IRepository<Job> jobRepo, IHostingEnvironment hostingEnvironment, IFileService serviceFile,
        IApplyRepository applisRepo)
        {
            _jobRepo = jobRepo;
            _hostingEnvironment = hostingEnvironment;
            _appliesRepo = applisRepo;
            _serviceFile = serviceFile;
        }
        [HttpGet("{id}")]
        public async Task<Job> Get(long id)
        {
            var job = await _jobRepo.GetAsync(id);
            job.ContentURL = System.IO.File.ReadAllText(Path.Combine(_hostingEnvironment.WebRootPath, job.ContentURL));
            return job;
        }
        [HttpGet]
        public async Task<IEnumerable<Job>> Get()
        {
            var jobs = await _jobRepo.GetsAsync();
            foreach (var job in jobs)
            {
                job.ContentURL = System.IO.File.ReadAllText(Path.Combine(_hostingEnvironment.WebRootPath, job.ContentURL));
            }
            return jobs;
        }

        [HttpGet("page/{page}")]
        public async Task<object> Get(int page)
        {
            var jobs = (await _jobRepo.GetsAsync()).ToList();
            foreach (var job in jobs)
            {
                job.ContentURL = System.IO.File.ReadAllText(Path.Combine(_hostingEnvironment.WebRootPath, job.ContentURL));
            }
            return new
            {
                data = jobs.Skip(page * 10).Take(10).ToList(),
                total = jobs.Count
            };
        }
        [HttpGet("search-job")]
        public async Task<IEnumerable<Job>> GetSearch(long workTypeId = 0, long jobGroupId = 0, string keyword = "")
        {
            if (keyword == null)
            {
                keyword = "";
            }
            keyword = keyword.ToString().Trim();
            var jobs = await _jobRepo.GetsAsync();
            var result = jobs.Where(o => o.Title.ToUpper().Contains(keyword) || o.ShortDescription.Contains(keyword)
            || o.Benefit.Contains(keyword) || o.Place.Contains(keyword) || o.Position.Contains(keyword)
            || o.Company.Name.Contains(keyword) || o.Company.Description.Contains(keyword)
            || o.Company.Address.Contains(keyword) || o.Company.Address.Contains(keyword)
            || o.WorkType.ShortName.Contains(keyword) || o.WorkType.Name.Contains(keyword)
            || o.JobGroup.Name.Contains(keyword) || o.JobGroup.ShortName.Contains(keyword));
            if (workTypeId != 0)
            {
                result = result.Where(z => z.WorkTypeId == workTypeId);
            }
            if (jobGroupId != 0)
            {
                result = result.Where(z => z.JobGroupId == jobGroupId);
            }
            return result;
        }
        [HttpGet("search-job-hot")]
        public async Task<IEnumerable<Job>> GetSearchHot(long jobGroupId = 0)
        {
            var jobs = await _jobRepo.GetsAsync();
            List<Job> result = new List<Job>();
            if (jobGroupId != 0)
            {
                result = jobs.Where(z => z.JobGroupId == jobGroupId && z.IsHot).OrderByDescending(z => z.CreatedDate).Take(10).ToList();
            }
            else
            {
                result = jobs.Where(z => z.IsHot).OrderByDescending(z => z.CreatedDate).Take(10).ToList();
            }
            return result;
        }
        [HttpGet("hot-interns")]
        public async Task<IEnumerable<Job>> GetHotIntern()
        {
            var jobs = await _jobRepo.GetsAsync();
            var onlyIntern = jobs.Where(o => o.WorkType.ShortName.Contains("TTS") || o.WorkType.ShortName.Contains("KT"))
             .Where(z => z.Status == "active").OrderByDescending(o => o.CreatedDate).Take(10);
            // foreach (var job in onlyIntern)
            // {
            //     job.ContentURL = System.IO.File.ReadAllText(Path.Combine(_hostingEnvironment.WebRootPath, job.ContentURL));
            // }
            return onlyIntern;
        }
        [HttpGet("hot-jobs")]
        public async Task<IEnumerable<Job>> GetHotJob()
        {
            var jobs = await _jobRepo.GetsAsync();
            var onlyJobs = jobs.Where(o => o.WorkType.ShortName.Contains("BTG") || o.WorkType.ShortName.Contains("TTG"))
             .Where(z => z.Status == "active").OrderByDescending(k => k.CreatedDate).Take(10);
            // foreach (var job in onlyJobs)
            // {
            //     job.ContentURL = System.IO.File.ReadAllText(Path.Combine(_hostingEnvironment.WebRootPath, job.ContentURL));
            // }
            return onlyJobs;
        }
        [HttpGet("only-jobs/{page}")]
        public async Task<object> GetOnlyJobs(int page)
        {
            var jobs = (await _jobRepo.GetsAsync()).ToList();
            var onlyJobs = jobs.Where(o => o.WorkType.ShortName.Contains("BTG") || o.WorkType.ShortName.Contains("TTG"))
            .Where(z => z.Status == "active").ToList();
            // foreach (var job in onlyJobs)
            // {
            //     job.ContentURL = System.IO.File.ReadAllText(Path.Combine(_hostingEnvironment.WebRootPath, job.ContentURL));
            // }
            return new
            {
                total = onlyJobs.Count,
                data = onlyJobs.Skip(page * 10).Take(10).ToList()
            };
        }
        [HttpGet("only-interns/{page}")]
        public async Task<object> GetOnlyInterns(int page)
        {
            var jobs = (await _jobRepo.GetsAsync()).ToList();
            var onlyIntern = jobs.Where(o => o.WorkType.ShortName.Contains("TTS") || o.WorkType.ShortName.Contains("KT"))
             .Where(z => z.Status == "active").ToList();
            // foreach (var job in onlyIntern)
            // {
            //     job.ContentURL = System.IO.File.ReadAllText(Path.Combine(_hostingEnvironment.WebRootPath, job.ContentURL));
            // }
            return new
            {
                total = onlyIntern.Count,
                data = onlyIntern.Skip(page * 10).Take(10).ToList()
            };
        }
        [HttpPost]
        public async Task<bool> Post([FromBody]Job model)
        {
            bool isAdded = await _jobRepo.AddAsync(model);
            return isAdded;
        }
        [HttpPut("{id}")]
        public async Task<bool> Put(long id, [FromBody] Job model)
        {
            bool isUpdated = await _jobRepo.UpdateAsync(model.Id, model);
            return isUpdated;
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<bool> Delete(long id)
        {
            bool isDeleted = await _jobRepo.RemoveAsync(id);
            return isDeleted;
        }
        #region admin
        [HttpPost("page")]
        [Authorize]
        public async Task<ModelPaging<Job>> Post([FromBody]FilterPageActionModel body)
        {
            var Jobs = await _jobRepo.GetsAsync();
            Jobs = Jobs.OrderByDescending(x => x.CreatedDate);
            if (body.KeySearch != null)
            {
                Jobs = Jobs.Where(a => a.Title.Contains(body.KeySearch) || a.Company.Name.Contains(body.KeySearch) || a.Company.ShortName.Contains(body.KeySearch)).ToList();
            }
            if (body.Status != null)
            {
                Jobs = Jobs.Where(a => a.Status == body.Status).ToList();
            }
            if (body.JobGroup_Id != 0)
            {
                Jobs = Jobs.Where(a => a.JobGroupId == body.JobGroup_Id).ToList();
            }
            if (body.Company_Id != 0)
            {
                Jobs = Jobs.Where(a => a.CompanyId == body.Company_Id).ToList();
            }
            if (body.Worktype_Id != 0)
            {
                Jobs = Jobs.Where(a => a.WorkTypeId == body.Worktype_Id).ToList();
            }
            var total = Jobs.Count();
            var ofsset = (body.CurrentPage * body.NumberItemPage) - body.NumberItemPage;
            Jobs = Jobs.Skip(ofsset).Take(body.NumberItemPage).ToList();
            return new ModelPaging<Job>
            {
                total = total,
                data = Jobs
            };
        }
        [HttpPost("create")]
        [Authorize]
        public async Task<bool> Create([FromBody]Job form)
        {
            //create file html and return url
            form.ContentURL = _serviceFile.CreateFileHmtl(form.ContentURL);
            return await _jobRepo.AddAsync(form);
        }
        [HttpPut("update/{id}")]
        [Authorize]
        public async Task<bool> Update(long id, [FromBody]Job form)
        {
            var item = await _jobRepo.GetAsync(id);
            if (item.ContentURL.Contains("default-content-job"))
            {
                form.ContentURL = _serviceFile.CreateFileHmtl(form.ContentURL);
                return await _jobRepo.UpdateAsync(id, form);
            }
            if (_serviceFile.DeleteFile(item.ContentURL))
            {
                form.ContentURL = _serviceFile.CreateFileHmtl(form.ContentURL);
                return await _jobRepo.UpdateAsync(id, form);
            }
            else
            {
                return false;
            }
        }
        [HttpGet("info/{id}")]
        public async Task<Job> GetInfo(long id)
        {
            var job = await _jobRepo.GetAsync(id);
            job.ContentURL = System.IO.File.ReadAllText(Path.Combine(_hostingEnvironment.WebRootPath, job.ContentURL));
            return job;
        }
        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<bool> DeleteItem(long id)
        {
            var item = await _jobRepo.GetAsync(id);
            if (_serviceFile.DeleteFile(item.ContentURL))
            {
                return await _jobRepo.RemoveAsync(id);
            }
            else
            {
                return false;
            }
        }
        [HttpPut("activate/{id}")]
        [Authorize]
        public async Task<bool> Activate(int id, [FromBody]Job form)
        {
            return await _jobRepo.UpdateAsync(id, form);
        }
        #endregion
    }
}
