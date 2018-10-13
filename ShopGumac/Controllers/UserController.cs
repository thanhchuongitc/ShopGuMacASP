using MongoDB.Bson;
using ShopGumac.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShopGumac.Controllers
{
    public class UserController : Controller
    {
        MongoContext db;
        public UserController()
        {
            db = new MongoContext();
        }
        
        [HttpPost]
        public bool Register(string name,string phone,string address,string email,string password,string sex,string birthday)
        {
            BsonDocument doc = new BsonDocument {
                { "name",name },
                { "phone",phone },
                { "address",address },
                { "email",email },
                { "password",password },
                { "sex",sex },
                { "birthday",birthday },
            };
            db._database.GetCollection<BsonDocument>("customers").InsertOne(doc);
            return true;
        }
    }
}