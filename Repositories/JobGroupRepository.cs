using System.Collections.Generic;
using System.Threading.Tasks;

using HuRe.Models;
using HuRe.Models.ActionModel;
using HuRe.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using HuRe.Db;

namespace Service.Repositories
{
    public interface IJobGroupRepository : IRepository<JobGroup>
    {
        Task<IEnumerable<JobGroup>> GetsAsyncPage(FilterPageActionModel body);
        int CountAll(FilterPageActionModel body);
    }
    public class JobGroupRepository : Repository<JobGroup>, IJobGroupRepository
    {
        private readonly JobDbContext _context;
        public JobGroupRepository(JobDbContext ctx) : base(ctx)
        {
            _context = ctx;
        }
        public int CountAll(FilterPageActionModel body)
        {
            var list = _context.JobGroups.ToList();
            if (body.KeySearch != null)
            {
                list = list.Where(a => a.Name.Contains(body.KeySearch) || a.ShortName.Contains(body.KeySearch)).ToList();
            }
            return list.Count;
        }

        public async Task<IEnumerable<JobGroup>> GetsAsyncPage(FilterPageActionModel body)
        {
            var list = await _context.JobGroups.ToListAsync();
            if (body.KeySearch != null)
            {
                list = list.Where(a => a.Name.Contains(body.KeySearch) || a.ShortName.Contains(body.KeySearch)).ToList();
            }
            var ofsset = (body.CurrentPage * body.NumberItemPage) - body.NumberItemPage;
            return list.Skip(ofsset).Take(body.NumberItemPage).ToList();
        }
    }
}