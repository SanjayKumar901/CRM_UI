using System;
using System.Collections.Generic;
using System.Globalization;
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
    public class BusinessController : Controller
    {
        public IActionResult BusinessReport()
        {
            return View();
        }
        public IActionResult HealthBusinessReport()
        {
            return View();
        }
        public IActionResult PaymentFailStatus()
        {
            return View();
        }
        public IActionResult Utility()
        {
            return View();
        }
        #region MissingPolicy
        public IActionResult MissingPolicy()
        {
            return View();
        }
        [HttpPost]
        public JsonResult UploadMissingPolicy()
        {
            string Response = "";
            string Path = "";
            try
            {
                string path = "";
                var GstFiles = Request.Form.Files;
                string Folder = Request.Form["Path"].ToString();
                IFormFile file = GstFiles[0];
                var existCookies = Request.Cookies["token"];
                var GetExtention = System.IO.Path.GetExtension(file.FileName);
                if (existCookies == null)
                {
                    Response = "Not Found.";
                }
                else if (GetExtention != ".pdf")
                {
                    Response = "File formate not support.";
                }
                else
                {
                    var fileName = System.IO.Path.GetFileNameWithoutExtension(file.Name) + GetExtention;
                    path = GetCurrentPath() + "/wwwroot/" + Folder + "/" + fileName;
                    var stream = new FileStream(GetCurrentPath() + "/wwwroot/" + Folder + "/" + fileName, FileMode.Create);
                    file.CopyTo(stream);
                    stream.Close();
                    Response = "Done";
                    Path = path;
                }
            }
            catch (Exception ex) { Response = ex.Message; }
            return Json(new { Response, Path });
        }

        private string CallLoadPolicy(PolicyUploadModel membervalues)
        {
            /*
            if (membervalues != null)
            {
                membervalues.ClientUrl = UriIdentifier._Uri;
                string callurl = string.Empty;
                callurl = membervalues.ClientUrl + "/api/api/InsurerMotor/MissingPolicies";
                string Response = "";
                string RequestJson = "";
                try
                {
                    

                    membervalues.PdfBytes = "";
                    membervalues.PDFFile = null;
                    var client1 = new RestClient(callurl);//"http://apsapi.stariengineering.com/api/InsurerMotor/GetALLPVCQuotationV2");
                    var request = new RestRequest(Method.POST);
                    request.AddHeader("Content-Type", "application/json");
                    if (RequestJson != null)
                        request.AddParameter("undefined", JsonConvert.SerializeObject(membervalues), ParameterType.RequestBody);
                    IRestResponse response = client1.Execute(request);
                    if (response.IsSuccessful)
                    {
                        Response = response.Content;
                        membervalues = JsonConvert.DeserializeObject<MissingPoliciesModel>(response.Content);
                    }
                    if (response.StatusCode == HttpStatusCode.BadRequest)
                    {
                        Response = "Bad Request" + response.Content;
                    }
                }
                catch (Exception ex) { }
                ViewBag.Message = membervalues.Status;
                return "";
            }
            else
            {
                return "";
            }
            */
            return "";
        }
        private string GetCurrentPath()
        {
            return System.IO.Directory.GetCurrentDirectory();
        }
        #endregion MissingPolicy


        public IActionResult OfflineModules()
        {
            ViewBag.pagesection = TempData["option"];
            //if (ViewBag.pagesection == null)
            //    ViewBag.pagesection = "Offline Update Policy";
            return View();
        }
        [HttpGet]
        public IActionResult SelectOfflineModules(string option)
        {
            TempData["option"] = option;
            return Json("ok");
        }
        public IActionResult OfflineUpdatePolicy()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> BulkMotorDataPost()
        {
            string Response = "";
            var Token = Request.Form["Token"];
            var Domain = Request.Form["Domain"];
            var Product = Request.Form["Product"];
            var url = Request.Form["url"];
            var GstFiles = Request.Form.Files;
            if (GstFiles.Count > 0)
            {
                IFormFile file = GstFiles[0];
                string path = GetCurrentPath() + "/wwwroot/TempManulBusinesBulk/" + Domain+".csv";
                using (var stream = new FileStream(path,FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                string GetData = System.IO.File.ReadAllText(path);
                string[] ListOfNewLine = GetData.Split(new string[] { "\n" }, StringSplitOptions.RemoveEmptyEntries);
                switch (Product)
                {
                    case "Motor":
                        Response = UploadMotorBusiness(Token, ListOfNewLine,url);
                        break;
                    case "HLT":
                        Response = UploadHLTBusiness(Token, ListOfNewLine, url);
                        break;
                    case "Life": //By: Sunil on 23 Aug 2021
                        Response = UploadLifeBusiness(Token, ListOfNewLine, url);
                        break;
                }
            }
            else
            {
                Response = "File not found.";
            }
            return Ok(Response);
        }
        private string UploadMotorBusiness(string Token, string[] ListOfNewLine,string Url)
        {
            string Response = "";
            List<BulkMotorBusinessList> bulkMotorBusinessList = new List<BulkMotorBusinessList>();
            int i = 0;
            foreach (string lineData in ListOfNewLine)
            {
                i += 1;
                if (i <= 1)
                    continue;
                string[] columns = lineData.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                try
                {
                    bulkMotorBusinessList.Add(new BulkMotorBusinessList()
                    {
                        UserEmail = columns[0],
                        MotorType = columns[1],
                        PolicyType = columns[2],
                        BasicOD = columns[3],
                        BasicTP = columns[4],
                        NetPremium = columns[5],
                        TotalPremium = columns[6],
                        ServiceTax = columns[7],
                        PolicyNo = columns[8],
                        EngineNo = columns[9],
                        ChesisNo = columns[10],
                        VehicleNo = columns[11],
                        IDV = columns[12],
                        Insurer = columns[13],
                        Make = columns[14],
                        Fuel = columns[15],
                        Variant = columns[16],
                        ManufacturingMonth = columns[17],
                        CustomerName = columns[18],
                        PolicyIssuedate = columns[19],
                        PolicyStartDate = columns[20],
                        PolicyEndDate = columns[21],
                        BusinessType = columns[22],
                        NCB = columns[23],
                        ChecqueNo = columns[24],
                        ChecqueDate = columns[25],
                        ChecqueBank = columns[26],
                        CustomerEmail = columns[27],
                        CustomerMobile = columns[28],
                        ManufacturingYear = columns[29],
                        PreviosNCB = columns[30],
                        CubicCapacity = columns[31],
                        RTOCode = columns[32],
                        PreviosPolicyNo = columns[33],
                        CPA = columns[34],
                        Period = columns[35],
                        InsuranceType = columns[36],
                        AddOnPremium = columns[37],
                        NillDep = columns[38],
                        IsPOSpProduct = columns[39],
                        CustomerAddress = columns[40],
                        
                    });

                }
                catch(Exception ex)
                {
                    Response = "File not supported.";
                }
            }
            ImportbulkMotorBusinessList users = new ImportbulkMotorBusinessList()
            {
                Token = Token,
                bulkMotorBusinessList = bulkMotorBusinessList
            };
            ReqModel Req = new ReqModel()
            {
                URL = Url,
                PostString = JsonConvert.SerializeObject(users)
            };
            Response = CommonMethods.GetResponse(Req.URL, Req.PostString);
            return Response;
        }
        private string UploadHLTBusiness(string Token, string[] ListOfNewLine, string Url)
        {
            string Response = "";
            List<BulkHltBusinessList> bulkHltBusinessList = new List<BulkHltBusinessList>();
            int i = 0;
            foreach (string lineData in ListOfNewLine)
            {
                i += 1;
                if (i <= 1)
                    continue;
                string[] columns = lineData.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                try
                {
                    bulkHltBusinessList.Add(new BulkHltBusinessList()
                    {
                        UserEmail = columns[0],
                        InsurerName = columns[1],
                        Policytype = columns[2],
                        PlanName = columns[3],
                        AdultCount = columns[4],
                        ChildCount = columns[5],
                        CustomerName = columns[6],
                        CustomerEmail = columns[7],
                        CustomerMobileNo = columns[8],
                        Address = columns[9],
                        City = columns[10],
                        Pincode = columns[11],
                        CustomerDOB = columns[12],
                        ProductName = columns[13],
                        ProductType = columns[14],
                        Product = columns[15],
                        Term = columns[16],
                        StartDate = columns[17],
                        EndDate = columns[18],
                        PolicyIssueDate = columns[19],
                        IsPosProduct = columns[20],
                        BusinessType = columns[21],
                        TotalPremium = columns[22],
                        NetPremium = columns[23],
                        ServiceTax = columns[24],
                        CoverAmount = columns[25],
                        BasePremium = columns[26],
                        PolicyNo = columns[27],
                        ChecqueDate = columns[28],
                        ChecqueNo = columns[29],
                        ChecqueBank = columns[30]
                    });

                }
                catch (Exception ex)
                {
                    Response = "File not supported.";
                }
            }
            ImportbulkHLTBusinessList users = new ImportbulkHLTBusinessList()
            {
                Token = Token,
                bulkHltBusinessList = bulkHltBusinessList
            };
            ReqModel Req = new ReqModel()
            {
                URL = Url,
                PostString = JsonConvert.SerializeObject(users)
            };
            Response = CommonMethods.GetResponse(Req.URL, Req.PostString);
            return Response;
        }

        [HttpPost]
        public async Task<JsonResult> OfflineManualPolicy()
        {
            string Response = "";
            string Path = "";
            try
            {
                string path = "";
                var GstFiles = Request.Form.Files;
                string Folder = Request.Form["Path"].ToString();
                IFormFile file = GstFiles[0];
                var existCookies = Request.Cookies["token"];
                string Token = Request.Form["Token"].ToString();
                Path = Request.Form["Path"].ToString();
                string url = Request.Form["url"].ToString();
                string GetFileName = Request.Form["FileName"].ToString();
                string DocName = Request.Form["Doc"].ToString();
                var GetExtention = System.IO.Path.GetExtension(file.FileName);
                if (existCookies == null)
                {
                    Response = "Not Found.";
                }
                else if (GetExtention != ".pdf")
                {
                    Response = "File formate not support.";
                }
                else
                {
                    var fileName = System.IO.Path.GetFileNameWithoutExtension(file.Name) + GetExtention;
                    path = GetCurrentPath() + "/wwwroot/" + Folder + "/" + fileName;
                    var stream = new FileStream(GetCurrentPath() + "/wwwroot/" + Folder + "/" + fileName, FileMode.Create);
                    file.CopyTo(stream);

                    byte[] myBinary = MasterController.ReadToEnd(stream);
                    Response = await MasterController.Upload(myBinary, url, fileName, Token, GetFileName, DocName);
                    stream.Close();
                    Response = "Done";
                    Path = path;
                }
            }
            catch (Exception ex) { Response = ex.Message; }
            return Json(new { Response, Path });
        }

        [HttpPost]
        public async Task<JsonResult> OfflineManualBulkFile()
        {
            string Response = "";
            string Path = "";
            try
            {
                string path = "";
                var GstFiles = Request.Form.Files;
                string Folder = Request.Form["Path"].ToString();
                foreach(IFormFile fileobj in GstFiles)
                {
                    IFormFile file = fileobj;
                    var existCookies = Request.Cookies["token"];
                    string Token = Request.Form["Token"].ToString();
                    Path = Request.Form["Path"].ToString();
                    string url = Request.Form["url"].ToString();
                    string DocName = Request.Form["Doc"].ToString();
                    var GetExtention = System.IO.Path.GetExtension(file.FileName);
                    if (GetExtention != ".pdf")
                    {
                        Response = "File formate not support.";
                    }
                    else
                    {
                        var fileNameonly = System.IO.Path.GetFileNameWithoutExtension(file.Name);
                        var fileName = fileNameonly + GetExtention;
                        path = GetCurrentPath() + "/wwwroot/" + Folder + "/" + fileName;
                        var stream = new FileStream(GetCurrentPath() + "/wwwroot/" + Folder + "/" + fileName, FileMode.Create);
                        file.CopyTo(stream);

                        byte[] myBinary = MasterController.ReadToEnd(stream);
                        Response = await MasterController.Upload(myBinary, url, fileName, Token, fileNameonly, DocName);
                        stream.Close();
                        Response = "Done";
                        Path = path;
                    }
                }                
            }
            catch (Exception ex) { Response = ex.Message; }
            return Json(new { Response, Path });
        }
        public IActionResult OfflineUpdateHLTPolicy()
        {
            return View();
        }
        public IActionResult UpdatePaymentStatus()
        {
            return View();
        }
        public IActionResult LifePolicy()
        {
            return View();
        }
        public IActionResult ConsolidateReport()
        {
            return View();
        }
        //*************Added By Durgesh(24May2021)****************
        public IActionResult OfflineUpdateCommercialPolicy()
        {
            return View();
        }

        //********************************************************

        #region Offline Life Policy
        /*
         -By: Sunil
         -Updated on: 23 Aug 2021
         */
        public IActionResult OfflineUpdateLifePolicy()
        {
            return View();
        }
        private string UploadLifeBusiness(string Token, string[] ListOfNewLine, string Url)
        {
            string Response = "";
            List<BulkLifeBusinessList> objList = new List<BulkLifeBusinessList>();
            int i = 0;
            foreach (string lineData in ListOfNewLine)
            {
                i += 1;
                if (i <= 1)
                    continue;
                string[] columns = lineData.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                try
                {
                    objList.Add(new BulkLifeBusinessList()
                    {
                        UserEmail = columns[0],
                        InsurerName = columns[1],
                        POSCode = columns[2],
                        POSName = columns[3],
                        POSSource = columns[4],
                        ReportingManagerName = columns[5],
                        RegionalManagerName = columns[6],
                        CustName = columns[7],
                        Address = columns[8],
                        City = columns[9],
                        Pin = columns[10],
                        State = columns[11],
                        PhoneNo = columns[12],
                        MobileNo = columns[13],
                        Email = columns[14],
                        DOB = columns[15],
                        ProductType = columns[16],
                        Product = columns[17],
                        ProductName = columns[18],
                        PolicyTerm = columns[19],
                        PremiumPayingTerm = columns[20],
                        PremiumPayingFrequency = columns[21],
                        BusinessType = columns[22],
                        PolicyNumber = columns[23],
                        StartDate = columns[24],
                        EndDate = columns[25],
                        PolicyIssueDate = columns[26],
                        SumAssured = columns[27],
                        NetPremium = columns[28],
                        GST = columns[29],
                        TotalPremium = columns[30],
                        Enquiryno = columns[31],
                        ProductIssuanceType = columns[32],
                        POSPProduct = columns[33]

                    });

                }
                catch (Exception ex)
                {
                    Response = "File not supported.";
                }
            }
            var data = new
            {
                Token = Token,
                bulkLifeBusinessList = objList
            };
            ReqModel Req = new ReqModel()
            {
                URL = Url,
                PostString = JsonConvert.SerializeObject(data)
            };
            Response = CommonMethods.GetResponse(Req.URL, Req.PostString);
            return Response;
        }
        #endregion

        #region POS Zoho Signup
        /*
         -By: Sunil
         -Updated on: 31 Aug 2021
         */
        public IActionResult POSSignup()
        {
            return View();
        }

        [HttpPost]
        public JsonResult UploadPosFile()
        {
            string Response = "";
            try
            {
                var files = Request.Form.Files;
                IFormFile file = files[0];
                var existCookies = Request.Cookies["token"];
                string Token = Request.Form["token"].ToString();
                string apiUrl = Request.Form["apiurl"].ToString();
                var GetExtention = System.IO.Path.GetExtension(file.FileName);

                List<string> posLines = new List<string>();

                if (file.Length > 0)
                {
                    using (Stream fs = file.OpenReadStream())
                    {
                        StreamReader reader = new StreamReader(file.OpenReadStream());
                        do
                        {
                            //string textLine = reader.ReadLine();
                            posLines.Add(reader.ReadLine());
                        }
                        while (reader.Peek() != -1);
                        reader.Close();
                        fs.Close();
                        Response = PosFiletoData(Token, posLines.ToArray(), apiUrl);
                    }
                }
            }
            catch (Exception ex) { Response = ex.Message; }
            return Json(new { status = true, message = Response });
        }

        private string PosFiletoData(string Token, string[] ListOfNewLine, string Url)
        {
            string Response = "";
            List<POSStampModel> objList = new List<POSStampModel>();
            int i = 0;
            foreach (string lineData in ListOfNewLine)
            {
                i += 1;
                if (i <= 1)
                    continue;
                string[] columns = lineData.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
                try
                {
                    if (columns.Length < 12)
                    {
                        continue;
                    }
                    if (string.IsNullOrEmpty(columns[0]) || string.IsNullOrEmpty(columns[1]) || string.IsNullOrEmpty(columns[9]) || string.IsNullOrEmpty(columns[10]) || string.IsNullOrEmpty(columns[11]))
                    {
                        continue;
                    }
                    CultureInfo enUS = new CultureInfo("en-US");
                    var dtIIB = new DateTime();
                    var dtSign = new DateTime();
                    if (DateTime.TryParseExact(columns[9], "dd-MM-yyyy", enUS, DateTimeStyles.None, out dtIIB) && DateTime.TryParseExact(columns[10], "dd-MM-yyyy", enUS, DateTimeStyles.None, out dtSign))
                    {
                        objList.Add(new POSStampModel()
                        {
                            POSCode = columns[0],
                            POSName = columns[1],
                            IIBDate = dtIIB,
                            SignDate = dtSign,
                            StampID = columns[11]
                        });
                    }
                    else
                    {
                        Response += String.Format("IIBDate or SignDate format for POSCode {0} is not valid. Required format DD-MM-YYYY" + Environment.NewLine, columns[0]);
                    }
                }
                catch (Exception ex)
                {
                    Response = ex.Message;
                }
            }
            if (Response.Length > 0)
            {
                return Response;
            }

            var data = new
            {
                Token = Token,
                posList = objList
            };
            string PostString = JsonConvert.SerializeObject(data);
            Response = CommonMethods.GetResponse(Url, PostString);
            return Response;
        }
        #endregion
    }
}