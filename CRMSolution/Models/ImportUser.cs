using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMSolution.Models
{
    public class ImportUser
    {
    }
    public class UserCreationList
    {
        public string Token { get; set; }
        public List<UserCreation> UserCreations { get; set; }
    }
    public class UserCreation
    {
        public string UserName { get; set; }
        public string Active { get; set; }
        public string Address { get; set; }
        public string PANNumber { get; set; }
        public string IFSC_Code { get; set; }
        public string PinCode { get; set; }
        public string DOB { get; set; }
        public string Gender { get; set; }
        public string BankAccountNo { get; set; }
        public string AdhaarNumber { get; set; }
        public string EmailAddress { get; set; }
        public string MobileNo { get; set; }
        public string RoleId { get; set; }
        public string KeyAccountManager { get; set; }
        public string ReferVal { get; set; }
        public string ReferPrifix { get; set; }
        public string PosVal { get; set; }
        public string PosPrifix { get; set; }
        public string RegionId { get; set; }
        public string BranchID { get; set; }
    }
    public class ImportRenewal 
    {
        public string Token { get; set; }
        public IList<RenewalModel> Renewals { get; set; }
    }
    public class RenewalModel
    {
        public string MobileNo { get; set; }
        public string ManufactureID { get; set; }
        public string VehicleID { get; set; }
        public string VariantID { get; set; }
        public string FuelID { get; set; }
        public int RegistartionYear { get; set; }
        public string RTOID { get; set; }
        public string PolicyType { get; set; }
        public string MotorType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string CityID { get; set; }
        public string StateID { get; set; }
        public int PinCode { get; set; }
        public decimal TotalPremium { get; set; }
        public string CompanyID { get; set; }
        public string EngineNo { get; set; }
        public string ChesisNo { get; set; }
        public string VehicleNo { get; set; }
        public DateTime PolicyExpiryDate { get; set; }
        public DateTime PolicyStartDate { get; set; }
        public decimal BasicOD { get; set; }
        public decimal BasicTP { get; set; }
    }
}
