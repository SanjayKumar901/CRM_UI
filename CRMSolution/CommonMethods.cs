using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace CRMSolution
{
    public class CommonMethods
    {
        public static string GetResponse(string url, string Requestdata)
        {
            string Response = "";
            try
            {
                byte[] data = Encoding.UTF8.GetBytes(Requestdata);
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "POST";
                request.ContentType = "application/json";
                //request.Headers.Add("Accept-Encoding", "gzip");
                Stream dataStream = request.GetRequestStream();
                dataStream.Write(data, 0, data.Length);
                dataStream.Close();
                WebResponse webResponse = request.GetResponse();

                var rsp = webResponse.GetResponseStream();
                using (StreamReader readStream = new StreamReader(rsp))
                {
                    Response = readStream.ReadToEnd();
                }

            }
            catch (WebException webEx)
            {
                try
                {
                    WebResponse response = webEx.Response;
                    Stream stream = response.GetResponseStream();
                    Response = new StreamReader(stream).ReadToEnd();
                }
                catch { }
            }
            catch(Exception ex) { Response = ex.Message; }
            return Response;
        }
        public static string Get(string url)
        {
            string Response = "";
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";
                request.ContentType = "application/json";
                //request.Headers.Add("Accept-Encoding", "gzip");
                //Stream dataStream = request.GetRequestStream();
                //dataStream.Close();
                WebResponse webResponse = request.GetResponse();

                var rsp = webResponse.GetResponseStream();
                using (StreamReader readStream = new StreamReader(rsp))
                {
                    Response = readStream.ReadToEnd();
                }

            }
            catch (WebException webEx)
            {

                WebResponse response = webEx.Response;
                Stream stream = response.GetResponseStream();
                Response = new StreamReader(stream).ReadToEnd();
            }
            catch (Exception ex) { Response = ex.Message; }
            return Response;
        }
    }
}
