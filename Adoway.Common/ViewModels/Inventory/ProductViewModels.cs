using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adoway.Common.ViewModels.Inventory
{
    public class ProductViewModel : BaseEnterpriseViewModel
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public Guid? SupplierId { get; set; }
        public string SupplierName { get; set; }
        public ProductType ProductType { get; set; }
        public string Name { get; set; }
        public decimal SalesPrice { get; set; }
        public MeasureUnit MeasureUnit { get; set; }
        public string FeaturePhoto { get; set; }
        public string Photos { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        [NotMapped]
        public bool FeaturePhotoChanged { get; set; }
    }
    public class ProductFilterViewModel : BaseFilterViewModel
    {
        public ProductFilter Filter { get; set; }
    }
    public class ProductFilter : BaseEnterpriseFilter
    {
        public string CategoryName { get; set; }
        public string SupplierName { get; set; }
        public string Name { get; set; }
        public Status? Status { get; set; }
        public ProductType? ProductType { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? SupplierId { get; set; }
    }
}
