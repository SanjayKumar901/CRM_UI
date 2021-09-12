using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CRMSolution.Models;
using Microsoft.AspNetCore.Http;
using CRMSolution.Auth;

namespace CRMSolution.Controllers
{
    [UserAuthorization]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult OfflineFeature()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult FeedBack()
        {
            return View();
        }
        public async Task<JsonResult> FileUploader()
        {
            string Response = "";
            string FileName = "";
            try
            {
                string Folder = Request.Form["file"];
                var files = Request.Form.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    IFormFile file = files[i];
                    FileName = file.Name;
                    var fileextention = System.IO.Path.GetExtension(file.FileName);
                    FileName += fileextention;
                    var filepath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory() + "//wwwroot//" + Folder, FileName);
                    using (var stream = System.IO.File.Create(filepath))
                    {
                        await file.CopyToAsync(stream);
                    }
                }
                Response = "Uploaded Successfull.";
            }
            catch(Exception ex)
            {
                Response = ex.Message;
            }
            return Json(new { Response, FileName });
        }
        public IActionResult HLTQuotePopup()
        {
            return ViewComponent("_HLTQuotePopup");
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
