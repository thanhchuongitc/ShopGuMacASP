using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Newtonsoft.Json;
using ShopGumac.App_Start;
using ShopGumac.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;
using System.Threading.Tasks;
namespace ShopGumac.Controllers
{
    public class UserController : Controller
    {
        MongoContext db;
        private const string key = "Bdb3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==";
        public UserController()
        {
            db = new MongoContext();
        }
        public string HashPass(string password)
        {
            StringBuilder hash = new StringBuilder();
            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(password));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2"));
            }
            return hash.ToString();
        }
        [HttpPost]
        public async Task<string> Login(string email,string password)
        {
            var pwd = HashPass(password);
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("email", email) & builder.Eq("password",pwd);
            var res = db._database.GetCollection<BsonDocument>("customers").Count(filter);
            var user = await db._database.GetCollection<BsonDocument>("customers").Find(filter).ToListAsync();
            UserModel e = new UserModel();
            var userT = user[0];
            e.name = userT[1].ToString();
            e.phone = userT[2].ToString();
            e.address = userT[3].ToString();
            if (res > 0)
            {
                Session["user"] = e;
                return "1";
            }
            else
                return "0";
        }
        [HttpPost]
        public bool Register(string name,string phone,string address,string email,string password,string sex,string birthday)
        {
            var pwd = HashPass(password);
            BsonDocument doc = new BsonDocument {
                { "name",name },
                { "phone",phone },
                { "address",address },
                { "email",email },
                { "password",pwd },
                { "sex",sex },
                { "birthday",birthday },
            };
            db._database.GetCollection<BsonDocument>("customers").InsertOne(doc);
            return true;
        }
    }
}