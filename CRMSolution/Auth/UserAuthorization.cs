using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRMSolution.Auth
{
    public class UserAuthorization : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            dynamic disc = context.ActionDescriptor;
            
            string token = context.HttpContext.Request.Cookies["token"];
            
            if (token == null)
            {
                context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { action = "Error", controller = "Account" }));
            }
            else
            {
                string ContentType = context.HttpContext.Request.ContentType != null ? context.HttpContext.Request.ContentType : "";
                if (ContentType.Contains("multipart/form-data"))
                {
                    
                }
                else
                {
                    string url = "/myaccount/" + disc.ControllerName + "/" + disc.ActionName;
                    if (context.HttpContext.Request.QueryString.HasValue && disc.ActionName != "MyProfile")
                        url += context.HttpContext.Request.QueryString.Value;
                    UserAuth auth = new UserAuth()
                    {
                        Token = token,
                        URl = url
                    };
                    url = apiURL(context.HttpContext.Request.Host.Host) + "/api/account/CheckAuthorization";
                   
                    try { System.IO.File.WriteAllText(System.IO.Directory.GetCurrentDirectory() + "\\CheckAuthorization.txt", JsonConvert.SerializeObject(auth)); } catch { }
                    var Respone = CommonMethods.GetResponse(url, JsonConvert.SerializeObject(auth));
                    try { System.IO.File.WriteAllText(System.IO.Directory.GetCurrentDirectory() + "\\CheckAuthorizationRes.txt", Respone); } catch { }
                    if (Respone != "Success")
                    {
                        //context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { action = "Error", controller = "Account" }));
                        //context.HttpContext.Response.Cookies.Delete("token");
                    }
                }
            }
            base.OnActionExecuting(context);
        }
        private string apiURL(string CurrentURL)
        {
            string Response = "";
            Response = Startup.API;
            try { System.IO.File.WriteAllText(System.IO.Directory.GetCurrentDirectory() + "\\apiRead.txt", Response); } catch { }
            /*
            string Response = "";
            if (CurrentURL.Contains("smcinsurance"))
            {
                return "https://crmapi.smcinsurance.com:8081";
            }
            else if (CurrentURL.Contains("religareonline"))
            {
                return "https://insurance.religareonline.com/coreapi";
            }
            else if (CurrentURL.Contains("localhost"))
            {
                return "http://localhost:50972";
            }
            else
            {
                return "http://corecrmapi.stariengineering.com";
            }
            */
            return Response;
        }
    }
    public class UserAuth
    {
        public string Token { get; set; }
        public string URl { get; set; }
    }
}
