using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HuRe.Db;
using HuRe.Models;
using Microsoft.EntityFrameworkCore;

namespace HuRe.Repositories
{
    public interface IApplyRepository : IRepository<Apply>
    {
        Task<Apply> GetApply(long accountId, long jobId);
        Task<IEnumerable<Apply>> GetAppliesOfAccount(long accountId);
        Task<IEnumerable<Apply>> GetAppliesOfJob(long jobId);
        Task<IEnumerable<Apply>> GetUsersApply(long jobId);
        Task<IEnumerable<Apply>> GetAll();
        Task<Apply> GetInfo(long accountId, long jobId);
        Task<bool> UpdateProgress(long accountId, long jobId, string status);
        Task<bool> DeleteAsync(long accountId, long jobId);
    }
    public class ApplyRepository : Repository<Apply>, IApplyRepository
    {
        private readonly JobDbContext _context;
        public ApplyRepository(JobDbContext ctx) : base(ctx)
        {
            _context = ctx;
        }
        public async Task<bool> DeleteAsync(long accountId, long jobId)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var exist = await _context.Applys.FindAsync(accountId,jobId);
                if (exist is null) return false;
                _context.Applys.Remove(exist);
                await _context.SaveChangesAsync();
                transaction.Commit();
                return true;
            }
        }

        public async Task<IEnumerable<Apply>> GetAll()
        {
            return await _context.Applys.Include(x => x.Account).Include(x => x.Account.CV).Include(x=>x.Job.Company).ToListAsync();
        }

        public async Task<IEnumerable<Apply>> GetAppliesOfAccount(long accountId)
        {
            return await _context.Applys.Include(z => z.Job).ThenInclude(z=>z.Company).Where(a => a.AccountId == accountId).ToListAsync();
        }

        public async Task<IEnumerable<Apply>> GetAppliesOfJob(long jobId)
        {
            return await _context.Applys.Where(a => a.JobId == jobId).ToListAsync();
        }

        public async Task<Apply> GetApply(long accountId, long jobId)
        {
            return await _context.Applys.FirstOrDefaultAsync(a => a.JobId == jobId && a.AccountId == accountId);
        }

        public async Task<Apply> GetInfo(long accountId, long jobId)
        {
            return await _context.Applys.Include(x => x.Account).Include(x => x.Account.CV).Include(x => x.Job.Company).Where(x => x.JobId == jobId && x.AccountId==accountId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Apply>> GetUsersApply(long jobId)
        {
            return await _context.Applys.Include(x=>x.Account).Include(x=>x.Account.CV).Where(x => x.JobId == jobId).ToListAsync();
        }

        public async Task<bool> UpdateProgress(long accountId, long jobId, string status)
        {
            try
            {
                //update count for job
                var job = await _context.Jobs.Where(x => x.Id == jobId).FirstAsync();
                if (status == "seen")
                {
                    job.ViewCount = job.ViewCount + 1;     
                }else if(status== "interview")
                {
                    if(job.ViewCount > 0)
                    {
                        job.ViewCount--;
                    }                   
                    job.InterviewCount++;
                }else if(status== "passed")
                {
                    if (job.InterviewCount > 0)
                    {
                        job.InterviewCount--;
                    }
                    job.PassCount++;
                }
                else if (status == "failed")
                {
                    if (job.InterviewCount > 0)
                    {
                        job.InterviewCount--;
                    }
                    job.FailCount++;
                }
                _context.Jobs.Update(job);
                var item =await _context.Applys.Where(x => x.AccountId == accountId && x.JobId == jobId).FirstAsync();
                item.Status = status;
                _context.Applys.Update(item);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}