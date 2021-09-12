
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMSolution.Models
{
    public class PolicyUploadModel
    {
        public string PolicyNo { get; set; }
        public string PDFPath { get; set; }
        public double ID { get; set; }
        public string InsurerName { get; set; }
        public string Startdate { get; set; }
        public string Enddate { get; set; }
        public string PDFPolicyNo { get; set; }
        public string VehicleNo { get; set; }
        public string ChassisNo { get; set; }
        public string EngineNo { get; set; }
        public DateTime PolicyStartDate { get; set; }
        public DateTime PolicyEndDate { get; set; }
        public string ClientUrl { get; set; }
        public string PdfBytes { get; set; }
        public double UserID { get; set; }
        public string Status { get; set; }
        public bool IsSuccess { get; set; }
        public double motorpolicyid { get; set; }
    }
}
