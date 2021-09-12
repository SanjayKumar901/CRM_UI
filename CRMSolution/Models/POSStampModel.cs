using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMSolution.Models
{
    public class POSStampModel
    {
        //public int? UserID { get; set; }
        public string StampID { get; set; }
        public string POSCode { get; set; }
        public string POSName { get; set; }
        public DateTime SignDate { get; set; }
    }
}
