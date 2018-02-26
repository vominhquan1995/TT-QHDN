using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using HuRe.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.WindowsAzure.Storage.Table;

namespace HuRe.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<bool> AddAsync(T o);
        Task<bool> RemoveAsync(long id);
        Task<bool> UpdateAsync(long id, T o);
        Task<T> GetAsync(long id);
        Task<IEnumerable<T>> GetsAsync();
    }

    public class Repository<T> : IRepository<T> where T : class, new()
    {
        private readonly JobDbContext _context;
        private const string PrimaryKey = "Id";
        public Repository(JobDbContext ctx)
        {
            _context = ctx;

        }
        public async Task<bool> AddAsync(T o)
        {
            try
            {
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    DbSet<T> dbset = _context.Set<T>();
                    await dbset.AddAsync(o);

                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> RemoveAsync(long id)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                var exist = await _context.Set<T>().FindAsync(id);
                if (exist is null) return false;
                _context.Set<T>().Remove(exist);
                await _context.SaveChangesAsync();
                transaction.Commit();
                return true;
            }
        }

        public async Task<bool> UpdateAsync(long id, T o)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    _context.Update(o);
                    _context.SaveChanges();
                    transaction.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
        }

        public async Task<T> GetAsync(long id)
        {
            try
            {
                var query = Query();
                await query.LoadAsync();
                var data =_context.Set<T>().Find(id);
                //resolve issue data tracked when get before update
                _context.Entry(data).State = EntityState.Detached;
                return data;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new T();
            }
        }

        public async Task<IEnumerable<T>> GetsAsync()
        {
            var result = Query();
            await result.LoadAsync();
            return await result.AsNoTracking().ToListAsync() ?? new List<T>();
        }
        public virtual IQueryable<T> Query()
        {
            var query = _context.Set<T>().AsQueryable();
            foreach (var property in _context.Model.FindEntityType(typeof(T)).GetNavigations())
                if (!property.FieldInfo.FieldType.IsGenericType)
                    query = query.Include(property.Name).AsQueryable();
            return query;
        }
    }
}
