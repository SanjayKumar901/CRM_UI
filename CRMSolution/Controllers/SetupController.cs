using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CRMSolution.Auth;
using CRMSolution.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CRMSolution.Controllers
{
    [UserAuthorization]
    public class SetupController : Controller
    {
        public IActionResult ImportUser()
        {
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> CallFile()
        {
            string Response = "";
            List<UserCreation> obj = new List<UserCreation>();
            try
            {
                var Token = Request.Form["Token"];
                var Domain = Request.Form["Domain"];
                var files = Request.Form.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    IFormFile file = files[i];
                    var FileName = file.FileName;
                    var filepath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory() + "//wwwroot//TempImportuser", FileName);
                    using (var stream = System.IO.File.Create(filepath))
                    {
                        await file.CopyToAsync(stream);
                    }
                    Response = GetUserList(filepath, ref obj);
                    //int clientID = (Session["LoginUser"] as Bonanza.Models.UserModel).ClientID.Value;
                    try
                    {
                        Response = JsonConvert.SerializeObject(obj);
                        System.IO.File.WriteAllText(System.IO.Directory.GetCurrentDirectory() + @"\userJson.txt", JsonConvert.SerializeObject(obj));
                    }
                    catch { }
                    UserCreationList users = new UserCreationList()
                    {
                        Token = Token,
                        UserCreations = obj
                    };
                    ReqModel Req = new ReqModel()
                    {
                        URL = Domain + "/api/Setup/ImportUser",
                        PostString = JsonConvert.SerializeObject(users)
                    };
                    Response = CommonMethods.GetResponse(Req.URL, Req.PostString);
                }
            }
            catch (Exception ex) { Response = ex.Message; }
            return Json(new { Response, obj });
        }
        #region Excel Reader
        public string GetUserList(string FilePath, ref List<UserCreation> lstUser)
        {
            string Response = "";
            string FileData = "";
            try
            {
                FileData = System.IO.File.ReadAllText(FilePath);
                int i = 0;
                var FileLines = FileData.Split(new string[] { "\n" }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var sheet in FileLines)
                {
                    if (i == 0)
                    {
                        i += 1;
                        continue;
                    }
                    var columns = sheet.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                    if (columns.Length < 19)
                        continue;
                    if (string.IsNullOrEmpty(columns[2]))
                        continue;
                    lstUser.Add(new UserCreation()
                    {
                        UserName = columns[0],
                        Active = columns[1],
                        EmailAddress = columns[2],
                        MobileNo = columns[3],
                        Address = columns[4],
                        RoleId = columns[5],
                        AdhaarNumber = columns[6],
                        PANNumber = columns[7],
                        KeyAccountManager = columns[8],
                        BankAccountNo = columns[9],
                        IFSC_Code = columns[10],
                        PinCode = columns[11],
                        DOB = columns[12],
                        Gender = columns[13],
                        ReferPrifix = columns[14],
                        ReferVal = columns[15],
                        PosPrifix = columns[16],
                        PosVal = columns[17],
                        RegionId = columns[18],
                        BranchID = columns[19],
                    });
                }
            }
            catch (Exception ex)
            {
                Response = ex.Message;
            }
            return Response;
        }
        #endregion
        public IActionResult EndUserMapping()
        {
            return View();
        }
        public IActionResult UserSetup()
        {
            return View();
        }
        public IActionResult VehicleVariantMapping()
        {
            return View();
        }
        public IActionResult Mastervehiclesetup()
        {
            return View();
        }
        public IActionResult UsersPrivileges()
        {
            return View();
        }
        public IActionResult Campaigns()
        {
            return View();
        }
        public IActionResult ImportRenewal()
        {
            return View();
        }
        [HttpPost]
        public IActionResult ImportRenewalData()
        {
            string Response = "";
            string Path = "";
            var existCookies = Request.Cookies["token"];
            if (existCookies == null)
            {
                Response = "Not Found.";
            }
            else
            {
                try
                {
                    var GstFiles = Request.Form.Files;
                    string path = Request.Form["Path"].ToString();
                    string APIurl = Request.Form["Domain"];
                    string Token = Request.Form["Token"];
                    IFormFile file = GstFiles[0];
                    var GetExtention = System.IO.Path.GetExtension(file.FileName);
                    var fileName = System.IO.Path.GetFileNameWithoutExtension(file.Name) + GetExtention;
                    path = GetCurrentPath() + "/wwwroot/RenewalImportData/" + fileName;
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        stream.Close();
                    }
                    Response = "Done";

                    string str = System.IO.File.ReadAllText(path);
                    var lstInfo = str.Split(new string[] { "\n" }, StringSplitOptions.RemoveEmptyEntries);
                    List<RenewalModel> objList = new List<RenewalModel>();
                    int i = 0;
                    foreach (var info in lstInfo)
                    {
                        i += 1;
                        if (i == 1)
                            continue;
                        var model = info.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                        if (model.Length == 28)
                        {
                            objList.Add(new RenewalModel()
                            {
                                MobileNo = model[0],
                                ManufactureID = model[1],
                                VehicleID = model[2],
                                VariantID = model[3],
                                FuelID = model[4],
                                RegistartionYear = Convert.ToInt32(model[5]),
                                RTOID = model[6],
                                PolicyType = model[7],
                                MotorType = model[8],
                                FirstName = model[9],
                                LastName = model[10],
                                Email = model[11],
                                DateOfBirth = Convert.ToDateTime(model[12]),
                                AddressLine1 = model[13],
                                AddressLine2 = model[14],
                                AddressLine3 = model[15],
                                CityID = model[16],
                                StateID = model[17],
                                PinCode = Convert.ToInt32(model[18]),
                                TotalPremium = Convert.ToDecimal(model[19]),
                                CompanyID = model[20],
                                EngineNo = model[21],
                                ChesisNo = model[22],
                                VehicleNo = model[23],
                                PolicyExpiryDate = Convert.ToDateTime(model[24]),
                                PolicyStartDate = Convert.ToDateTime(model[25]),
                                BasicOD = Convert.ToInt32(model[26]),
                                BasicTP = Convert.ToInt32(model[27]),
                            });
                        }
                        else
                        {
                            objList = null;
                            Response = "Unformated File.";
                            goto GOTOMO;
                        }
                    }
                    if (objList != null)
                    {
                        ImportRenewal obj = new ImportRenewal()
                        {
                            Token = Token,
                            Renewals = objList
                        };
                        Response = CommonMethods.GetResponse(APIurl, JsonConvert.SerializeObject(obj));
                    }
                   GOTOMO:
                    Response = Response == "Unformated File." ? Response : Response;
                }
                catch (Exception ex) { Response = ex.Message; }
            }
            return Json(new { Response, Path });
        }
        private string GetCurrentPath()
        {
            return System.IO.Directory.GetCurrentDirectory();
        }

        public IActionResult DigitalSignature()
        {
            return View();
        }
        public IActionResult SetupLicBroKing()
        {
            return View();
        }
    }
}