using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.Project
{
    public class ContractEntity : BaseEnterpriseEntity
    {

        public Guid ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public ProjectEntity Project { get; set; }
    }
}
