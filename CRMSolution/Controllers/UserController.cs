using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CRMSolution.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRMSolution.Controllers
{
    [UserAuthorization]
    public class UserController : Controller
    {
        public IActionResult Users()
        {
            return View();
        }
        public IActionResult MyProfile(string userid=null)
        {
            ViewData["userid"] = userid;
            return View();
        }
        public IActionResult MyRenewal()
        {
            return View();
        }
        public IActionResult Priv()
        {
            return View();
        }
        public IActionResult Link(string Linktype)
        {
            ViewData["Linktype"] = Linktype;
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> UploadData()
        {
            string Response = "";
            var existCookies = Request.Cookies["token"];
            if (existCookies == null)
            {
                Response = "Not Found.";
            }
            else
            {
                var GstFiles = Request.Form.Files;
                string Token = Request.Form["Token"].ToString();
                string Path = Request.Form["Path"].ToString();
                string url = Request.Form["url"].ToString();
                string GetFileName = Request.Form["FileName"].ToString();
                string DocName = Request.Form["Doc"].ToString();
                string userid = Request.Form["userid"].ToString();
                IFormFile file = GstFiles[0];
                var GetExtention = System.IO.Path.GetExtension(file.FileName);
                if ((GetExtention == ".jpg" || GetExtention == ".jpeg" || GetExtention == ".pdf"))
                {
                    var fileName = System.IO.Path.GetFileNameWithoutExtension(file.Name) + GetExtention;
                    using (var stream = new FileStream(GetCurrentPath() + "/wwwroot/" + Path + "/" + fileName, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        byte[] myBinary = MasterController.ReadToEnd(stream);
                        Response = await MasterController.Upload(myBinary, url, fileName, Token, GetFileName, DocName);
                    }
                }
                else
                {
                    Response = "File formate not support.";
                }
            }
            return Json(Response);
        }
        private bool CompareArray(byte[] a1, byte[] a2)
        {
            if (a1.Length != a2.Length)
                return false;

            for (int i = 0; i < a1.Length; i++)
            {
                if (a1[i] != a2[i])
                    return false;
            }

            return true;
        }
        private string GetCurrentPath()
        {
            return System.IO.Directory.GetCurrentDirectory();
        }
        public IActionResult Certificate()
        {
            return View();
        }
        public IActionResult DocumentVerification()
        {
            return View();
        }
        public IActionResult UserVerification()
        {
            return View();
        }
        public IActionResult UsersFeedBack()
        {
            return View();
        }
        public IActionResult LICRedirection()
        {
            return View();
        }
    }
}