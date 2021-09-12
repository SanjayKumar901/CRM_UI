using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Wangkanai.Detection.Services;

namespace CRMSolution.Controllers
{
    public class AccountController : Controller
    {
        private readonly IDetectionService _detectionService;
        public AccountController(IDetectionService detectionService)
        {
            _detectionService = detectionService;
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult LoginCheck([FromBody]Login model)
        {
            string Response = "";
            try
            {
                Response = CommonMethods.GetResponse("http://corecrmapi.stariengineering.com/api/Account/LoginUser",
                    JsonConvert.SerializeObject(model));
            }
            catch (Exception ex) { Response = ex.Message; }
            return Json(Response);
        }

        //[HttpPost]
        //public JsonResult CallCheck([FromBody]ReqModel model)
        //{
        //    string Response = "";
        //    Response = CommonMethods.GetResponse(model.URL, model.PostString);
        //    return Json(Response);
        //}

        [HttpPost]
        public JsonResult CallCheck([FromBody] ReqModel model)
        {
            if (model != null && model.PostString != null)
            {
                var loginData = JsonConvert.DeserializeObject<Login>(model.PostString);
                if (!String.IsNullOrEmpty(loginData.Password))
                {
                    loginData.DeviceName = _detectionService.Device.Type.ToString();
                    model.PostString = JsonConvert.SerializeObject(loginData);
                }
            }
            string Response = "";
            Response = CommonMethods.GetResponse(model.URL, model.PostString);
            return Json(Response);
        }

        [HttpPost]
        public JsonResult CallGet([FromBody]ReqModel model)
        {
            string Response = "";
            Response = CommonMethods.Get(model.URL);
            return Json(Response);
        }
        public IActionResult LoginLink(string Token)
        {
            if(Token != null)
            {
                return View();
            }
            return RedirectToAction("Login");
        }
        [HttpGet]
        public IActionResult Error()
        {
            return View();
        }
        [HttpGet]
        public IActionResult GetAPIDomain()
        {
            string apiDomain = Startup.API;
            try { System.IO.File.WriteAllText(System.IO.Directory.GetCurrentDirectory() + "\\apiDomainRead.txt", apiDomain); } catch { }
            return Ok(apiDomain);
        }
    }
    public class ReqLogin
    {
        public string URL { get; set; }
        public Login PostData { get; set; }
    }
    public class Login
    {
        public string UserID { get; set; }
        public string Password { get; set; }
        public string ClientURL { get; set; }
        public string DeviceName { get; set; }
        
    }
    public class ReqModel
    {
        public string URL { get; set; }
        public string PostString { get; set; }
    }
}