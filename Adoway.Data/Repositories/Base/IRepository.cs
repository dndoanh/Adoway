using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Repositories.Base
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        Task<TEntity> Insert(TEntity dto);
        Task<IEnumerable<TEntity>> Insert(IEnumerable<TEntity> list);
        Task<TEntity> Update(TEntity dto);
        Task<IEnumerable<TEntity>> Update(List<TEntity> list);
        Task<TEntity> GetById(Guid id);
        Task<TEntity> Delete(Guid id);
        Task<TEntity> Delete(TEntity dto);
        Task<TEntity> SingleBy(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> LastSingleBy(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, DateTime>> selector);
        Task<List<TEntity>> FindByAsync(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> GetAll();
        IQueryable<TEntity> GetRange(int pageIndex, int pageSize);
        IQueryable<TEntity> GetRange(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize);
        IQueryable<TEntity> GetRange(Expression<Func<TEntity, bool>> predicate, int pageIndex, int pageSize, out int totalRecord);
    }
}
