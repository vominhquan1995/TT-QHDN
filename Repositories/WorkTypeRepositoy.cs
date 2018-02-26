using HuRe.Db;
using HuRe.Models;
using HuRe.Models.ActionModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Repositories
{
    public interface IWorkTypeRepository : IRepository<WorkType>
    {
        Task<IEnumerable<WorkType>> GetsAsyncPage(FilterPageActionModel body);
        int CountAll(FilterPageActionModel body);
    }
    public class WorkTypeRepository : Repository<WorkType>, IWorkTypeRepository
    {
        private readonly JobDbContext _context;
        public WorkTypeRepository(JobDbContext ctx) : base(ctx)
        {
            _context = ctx;
        }
        public int CountAll(FilterPageActionModel body)
        {
            var list = _context.WorkTypes.ToList();
            if (body.KeySearch != null)
            {
                list = list.Where(a => a.Name.Contains(body.KeySearch) || a.ShortName.Contains(body.KeySearch)).ToList();
            }
            return list.Count;
        }

        public async Task<IEnumerable<WorkType>> GetsAsyncPage(FilterPageActionModel body)
        {
            var list = await _context.WorkTypes.ToListAsync();
            if (body.KeySearch != null)
            {
                list = list.Where(a => a.Name.Contains(body.KeySearch) || a.ShortName.Contains(body.KeySearch)).ToList();
            }
            var ofsset = (body.CurrentPage * body.NumberItemPage) - body.NumberItemPage;
            return list.Skip(ofsset).Take(body.NumberItemPage).ToList();
        }
    }
}
