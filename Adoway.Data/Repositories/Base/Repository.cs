using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Transactions;
using Adoway.Data.Context;
using Adoway.Data.Entities.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Base
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly ILogger _Logger;
        private readonly IAdowayContext _DbContext;

        public Repository(ILogger logger, IAdowayContext dbContext)
        {
            _Logger = logger;
            _DbContext = dbContext;
        }

        public async Task<TEntity> Insert(TEntity entity)
        {
            try
            {
                _DbContext.DbSet<TEntity>().Add(entity);
                await _DbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                entity = null;
                _Logger.LogError(ex.Message, ex);
            }
            return entity;
        }
        public async Task<IEnumerable<TEntity>> Insert(IEnumerable<TEntity> list)
        {
            var options = new TransactionOptions
            {
                IsolationLevel = IsolationLevel.ReadCommitted,
                Timeout = new TimeSpan(0, 3, 0)
            };
            using var trans = new TransactionScope(TransactionScopeOption.Required, options);
            try
            {
                _DbContext.DbSet<TEntity>().AddRange(list);
                await _DbContext.SaveChangesAsync();
                trans.Complete();
            }
            catch (Exception ex)
            {
                list = null;
                _Logger.LogError(ex.Message, ex);
            }
            return list;
        }
        public async Task<TEntity> Update(TEntity entity)
        {
            try
            {
                _DbContext.DbSet<TEntity>().Update(entity);
                await _DbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                entity = null;
                _Logger.LogError(ex.Message, ex);
            }
            return entity;
        }
        public async Task<IEnumerable<TEntity>> Update(List<TEntity> list)
        {
            var options = new TransactionOptions
            {
                IsolationLevel = IsolationLevel.ReadCommitted,
                Timeout = new TimeSpan(0, 3, 0)
            };
            using var trans = new TransactionScope(TransactionScopeOption.Required, options);
            try
            {
                foreach (var item in list)
                {
                    _DbContext.DbSet<TEntity>().Update(item);
                }
                await _DbContext.SaveChangesAsync();
                trans.Complete();
            }
            catch (Exception ex)
            {
                list = null;
                _Logger.LogError(ex.Message, ex);
            }
            return list;
        }
        public async Task<TEntity> GetById(Guid id)
        {
            return await _DbContext.DbSet<TEntity>().FindAsync(id);
        }
        public async Task<TEntity> SingleBy(Expression<Func<TEntity, bool>> predicate)
        {
            return await _DbContext.DbSet<TEntity>().Where(predicate).FirstOrDefaultAsync();
        }
        public async Task<TEntity> LastSingleBy(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, DateTime>> selector)
        {
            return await _DbContext.DbSet<TEntity>().Where(predicate).OrderByDescending(selector).FirstOrDefaultAsync();
        }
        public async Task<List<TEntity>> FindByAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _DbContext.DbSet<TEntity>().Where(predicate).ToListAsync();
        }
        public IQueryable<TEntity> GetAll()
        {
            return _DbContext.DbSet<TEntity>();
        }

        public IQueryable<TEntity> GetRange(int pageIndex, int pageSize)
        {
            return _DbContext.DbSet<TEntity>().OrderBy(x => x.Id).Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        public IQueryable<TEntity> GetRange(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize)
        {
            return _DbContext.DbSet<TEntity>().Where(predicate).OrderBy(x => x.Id).Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
        public IQueryable<TEntity> GetRange(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize, out int totalRecord)
        {
            var result = _DbContext.DbSet<TEntity>().Where(predicate).OrderBy(x => x.Id);
            totalRecord = result.Count();
            return result.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
        public async Task<TEntity> Delete(Guid id)
        {
            var item = await _DbContext.DbSet<TEntity>().FindAsync(id);
            try
            {
                if (item != null)
                {
                    _DbContext.DbSet<TEntity>().Remove(item);
                    await _DbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                item = null;
                _Logger.LogError(ex.Message, ex);
            }
            return item;
        }
        public async Task<TEntity> Delete(TEntity entity)
        {
            var item = await _DbContext.DbSet<TEntity>().FindAsync(entity.Id);
            try
            {
                if (item != null)
                {
                    _DbContext.DbSet<TEntity>().Remove(item);
                    await _DbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                item = null;
                _Logger.LogError(ex.Message, ex);
            }
            return item;
        }
    }
}