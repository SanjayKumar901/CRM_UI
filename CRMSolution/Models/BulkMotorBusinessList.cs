using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMSolution.Models
{
    public class BulkMotorBusinessList
    {
        public string UserEmail { get; set; }
        public string MotorType { get; set; }
        public string PolicyType { get; set; }
        public string BasicOD { get; set; }
        public string BasicTP { get; set; }
        public string GrossPremium { get; set; }
        public string NetPremium { get; set; }
        public string TotalPremium { get; set; }
        public string ServiceTax { get; set; }
        public string PolicyNo { get; set; }
        public string EngineNo { get; set; }
        public string ChesisNo { get; set; }
        public string VehicleNo { get; set; }
        public string IDV { get; set; }
        public string Insurer { get; set; }
        public string Make { get; set; }
        public string Fuel { get; set; }
        public string Variant { get; set; }
        public string ManufacturingMonth { get; set; }
        public string CustomerName { get; set; }
        public string PolicyIssuedate { get; set; }
        public string PolicyStartDate { get; set; }
        public string PolicyEndDate { get; set; }
        public string BusinessType { get; set; }
        public string NCB { get; set; }
        public string ChecqueNo { get; set; }
        public string ChecqueDate { get; set; }
        public string ChecqueBank { get; set; }
        public string Vehicle { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerMobile { get; set; }
        public string ManufacturingYear { get; set; }
        public string PreviosNCB { get; set; }
        public string CubicCapacity { get; set; }
        public string RTOCode { get; set; }
        public string PreviosPolicyNo { get; set; }
        public string CPA { get; set; }
        public string Period { get; set; }
        public string InsuranceType { get; set; }
        public string AddOnPremium { get; set; }
        public string NillDep { get; set; }
        public string IsPOSpProduct { get; set; }
        public string CustomerAddress { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PhoneNo { get; set; }
        public string PinCode { get; set; }
        public string CustomerDOB { get; set; }
        public string FaxNo { get; set; }
        public string PanNo { get; set; }
        public string GrossDiscount { get; set; }
    }
    public class BulkHltBusinessList
    {
        public string UserEmail { get; set; }
        public string InsurerName { get; set; }
        public string Policytype { get; set; }
        public string PlanName { get; set; }
        public string AdultCount { get; set; }
        public string ChildCount { get; set; }
        public string TotalPremium { get; set; }
        public string ServiceTax { get; set; }
        public string CoverAmount { get; set; }
        public string BasePremium { get; set; }
        public string PolicyNo { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerMobile { get; set; }
        public string ChecqueDate { get; set; }
        public string ChecqueNo { get; set; }
        public string ChecqueBank { get; set; }
        public string CustomerMobileNo { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Pincode { get; set; }
        public string CustomerDOB { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string Product { get; set; }
        public string Term { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string PolicyIssueDate { get; set; }
        public string IsPosProduct { get; set; }
        public string BusinessType { get; set; }
        public string NetPremium { get; set; }
    }
    public class ImportbulkMotorBusinessList
    {
        public string Token { get; set; }
        public List<BulkMotorBusinessList> bulkMotorBusinessList { get; set; }
    }
    public class ImportbulkHLTBusinessList
    {
        public string Token { get; set; }
        public List<BulkHltBusinessList> bulkHltBusinessList { get; set; }
    }


    #region Offline Life Policy
    public class BulkLifeBusinessList
    {
        public string UserEmail { get; set; }
        public string InsurerName { get; set; }
        public string POSCode { get; set; }
        public string POSName { get; set; }
        public string POSSource { get; set; }
        public string ReportingManagerName { get; set; }
        public string RegionalManagerName { get; set; }
        public string CustName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Pin { get; set; }
        public string State { get; set; }
        public string PhoneNo { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string DOB { get; set; }
        public string ProductType { get; set; }
        public string Product { get; set; }
        public string ProductName { get; set; }
        public string PolicyTerm { get; set; }
        public string PremiumPayingTerm { get; set; }
        public string PremiumPayingFrequency { get; set; }
        public string BusinessType { get; set; }
        public string PolicyNumber { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string PolicyIssueDate { get; set; }
        public string SumAssured { get; set; }
        public string NetPremium { get; set; }
        public string GST { get; set; }
        public string TotalPremium { get; set; }
        public string Enquiryno { get; set; }
        public string ProductIssuanceType { get; set; }
        public string POSPProduct { get; set; }
    }
    //public class ImportBulkLifeBusinessList
    //{
    //    public string Token { get; set; }
    //    public List<BulkLifeBusinessList> bulkLifeBusinessList { get; set; }
    //}
    #endregion
}
