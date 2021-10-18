using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using Adoway.Data.Context;
using Adoway.Data.Entities.System;
using Adoway.Data.Repositories.System;
using Adoway.Service.Base;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Adoway.Service.System
{
    public class EnterpriseService : BaseService, IEnterpriseService
    {
        private readonly IMapper _mapper;
        private readonly IEnterpriseRepository _enterpriseRepo;
        private readonly IConfiguration _configuration;
        public EnterpriseService(IConfiguration configuration, IAdowayContext dbContext, IMapper mapper, IEnterpriseRepository languageRepo) : base(dbContext)
        {
            _configuration = configuration;
            _mapper = mapper;
            _enterpriseRepo = languageRepo;
        }

        public async Task<EnterpriseViewModel> Create(EnterpriseViewModel model)
        {
            var entity = await _enterpriseRepo.Insert(_mapper.Map<EnterpriseEntity>(model));
            return _mapper.Map<EnterpriseViewModel>(entity);
        }

        public async Task<EnterpriseViewModel> Edit(EnterpriseViewModel model)
        {
            var entEntity = await _enterpriseRepo.GetById(model.Id);
            if (entEntity != null)
            {
                entEntity.Name = model.Name;
                entEntity.Email = model.Email;
                entEntity.Phone = model.Phone;
                entEntity.Address = model.Address;
                entEntity.Status = model.Status;
                var entity = await _enterpriseRepo.Update(entEntity);
                return _mapper.Map<EnterpriseViewModel>(entity);
            }
            return null;
        }

        public async Task<List<EnterpriseViewModel>> GetAll()
        {
            var list = await _enterpriseRepo.GetAll().ToListAsync();
            return _mapper.Map<List<EnterpriseViewModel>>(list);
        }

        public async Task<EnterpriseViewModel> Remove(Guid id)
        {
            var entity = await _enterpriseRepo.Delete(id);
            return _mapper.Map<EnterpriseViewModel>(entity);
        }
        public async Task<ApiResponseViewModel<EnterpriseViewModel>> SearchEnterprises(EnterpriseFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<EnterpriseViewModel>().FromSqlRaw("EXEC SP_SearchEnterprises @Name, @Email, @Phone, @Address, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Email", model.Filter.Email),
                SqlParameterHelper.AddNullableStringParameter("@Phone", model.Filter.Phone),
                SqlParameterHelper.AddNullableStringParameter("@Address", model.Filter.Address),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            
            return new ApiResponseViewModel<EnterpriseViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
