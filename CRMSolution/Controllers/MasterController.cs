using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CRMSolution.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace CRMSolution.Controllers
{
    [UserAuthorization]
    public class MasterController : Controller
    {
        public IActionResult MasterSetup()
        {
            return View();
        }

        public IActionResult ManageCertificate()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> UploadLogo()
        {
            string Response = "";
            var GstFiles = Request.Form.Files;
            string Token = Request.Form["Token"].ToString();
            string url = Request.Form["url"].ToString();
            string LogoFile = Request.Form["Folder"].ToString();
            foreach (var GstFile in GstFiles)
            {
                IFormFile file = GstFile;
                var GetExtention = Path.GetExtension(file.FileName);
                var fileName = Path.GetFileNameWithoutExtension(file.FileName) + GetExtention;
                using (var stream = new FileStream(GetCurrentPath() + "/wwwroot/" + LogoFile + "/" + fileName, FileMode.Create))
                {
                    file.CopyTo(stream);
                    byte[] myBinary = ReadToEnd(stream);
                    switch (LogoFile)
                    {
                        case "LogoFile":
                            await Upload(myBinary, url, fileName, Token);
                            break;
                        case "Certificate/Header":
                            await Upload(myBinary, url, fileName, Token, null, LogoFile);
                            break;
                        case "Certificate/Footer":
                            await Upload(myBinary, url, fileName, Token, null, LogoFile);
                            break;
                        case "Certificate/AuthorizeSign":
                            await Upload(myBinary, url, fileName, Token, null, LogoFile);
                            break;
                        case "Certificate":
                            await Upload(myBinary, url, fileName, Token, null, LogoFile);
                            break;
                        case "PosExamFiles":
                            Response = await Upload(myBinary, url, fileName, Token,file.Name, "PosExamFiles");
                            break;
                        default:
                            Response  = await Upload(myBinary, url, fileName, Token, null, LogoFile);
                            break;

                    }
                }
            }
            if(LogoFile.Contains("LogoFile"))
                Response = "Congratulations! Your logo is been uploaded.";

            return Json(Response);
        }

        public static async Task<string> Upload(byte[] image,string url,string filename,string Token, 
            string Name = null, string DocName = null)
        {
            using (var client = new HttpClient())
            {
                using (var content =new MultipartFormDataContent())
                {
                    content.Add(new StringContent(Token), "Token");
                    if(Name!=null)
                        content.Add(new StringContent(Name), "UserID");
                    if(DocName!=null)
                        content.Add(new StringContent(DocName), "DocName");
                    content.Add(new StreamContent(new MemoryStream(image)), Name==null? "bilddatei":Name, filename);

                    using (
                       var message =
                           await client.PostAsync(url, content))
                    {
                        var input = await message.Content.ReadAsStringAsync();
                        var result= !string.IsNullOrWhiteSpace(input) ? input : null;
                        if (result == null)
                        {
                            return "Success";
                        }
                        else
                        {
                            return result;
                        }
                    }
                }
            }
        }

        private string GetCurrentPath()
        {
            return System.IO.Directory.GetCurrentDirectory();
        }
        public static byte[] ReadToEnd(System.IO.Stream stream)
        {
            long originalPosition = 0;

            if (stream.CanSeek)
            {
                originalPosition = stream.Position;
                stream.Position = 0;
            }

            try
            {
                byte[] readBuffer = new byte[4096];

                int totalBytesRead = 0;
                int bytesRead;

                while ((bytesRead = stream.Read(readBuffer, totalBytesRead, readBuffer.Length - totalBytesRead)) > 0)
                {
                    totalBytesRead += bytesRead;

                    if (totalBytesRead == readBuffer.Length)
                    {
                        int nextByte = stream.ReadByte();
                        if (nextByte != -1)
                        {
                            byte[] temp = new byte[readBuffer.Length * 2];
                            Buffer.BlockCopy(readBuffer, 0, temp, 0, readBuffer.Length);
                            Buffer.SetByte(temp, totalBytesRead, (byte)nextByte);
                            readBuffer = temp;
                            totalBytesRead++;
                        }
                    }
                }

                byte[] buffer = readBuffer;
                if (readBuffer.Length != totalBytesRead)
                {
                    buffer = new byte[totalBytesRead];
                    Buffer.BlockCopy(readBuffer, 0, buffer, 0, totalBytesRead);
                }
                return buffer;
            }
            finally
            {
                if (stream.CanSeek)
                {
                    stream.Position = originalPosition;
                }
            }
        }
    }
}
