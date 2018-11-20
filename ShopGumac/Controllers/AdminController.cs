using MongoDB.Bson;
using MongoDB.Driver;
using ShopGumac.App_Start;
using ShopGumac.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShopGumac.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        MongoContext client;
        public AdminController() {
            client = new MongoContext();
        }
        private bool checkLogin()
        {
            if (Session["user"] == null)
                return true;
            return false;
        }
        public ActionResult ListProduct()
        {
            if (checkLogin())
                return RedirectToAction("Index","Index");
            var res = client.database.GetCollection<ProductModel>("products").FindAll().ToList();
            return View(res);
        }

        public ActionResult AddProduct()
        {
            if (checkLogin())
                return RedirectToAction("Index", "Index");
            return View();
        }
        [HttpPost]
        public ActionResult AddProduct(HttpPostedFileBase file,string product_name, string price,
            string [] size, string note,string color,string discount,
            string inventory,string type_product)
         {
            try
            {
                string[] arrColor = color.Split(new char[] { ';' });
                BsonArray arrbsSize = new BsonArray();
                foreach(var i in size)
                {
                    arrbsSize.Add(i);
                }
                BsonArray arrbsColor = new BsonArray();
                foreach (var i in arrColor)
                { 
                    arrbsColor.Add(i);
                }
                BsonArray arrbsIMG = new BsonArray();
                if (file.ContentLength > 0)
                {
                    string _FileName = Path.GetFileName(file.FileName);
                    string _path = Path.Combine(Server.MapPath("~/images"), _FileName);
                    file.SaveAs(_path);
                    arrbsIMG.Add(_FileName);
                }
                var document = new BsonDocument {
                {"name",product_name},
                {"prices",float.Parse(price) },
                {"size",arrbsSize },
                {"color",arrbsColor },
                {"discount",float.Parse(discount) },
                { "inventory",int.Parse(inventory)},
                {"descript",note},
                {"type",type_product},
                {"image",arrbsIMG }
            };
                client._database.GetCollection<BsonDocument>("products").InsertOne(document);
                return RedirectToAction("ListProduct");
            }
            catch
            {
                return RedirectToAction("ListProduct");

            }
           
        }

        public ActionResult EditProduct(string id) {
            if (checkLogin())
                return RedirectToAction("Index", "Index");
            if (String.IsNullOrEmpty(id))
                return RedirectToAction("ListProduct");
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("_id",ObjectId.Parse(id));
            var product = client._database.GetCollection<BsonDocument>("products").Find(filter).ToList();
            ViewBag.product = product[0];
            ViewBag.idProduct = id;
            return View();
        }
        [HttpPost]
        public ActionResult updateProduct(string product_name, string price,
            string[] size, string note, string color, string discount,
            string inventory, string type_product,string id)
        {
            try
            {
                string[] arrColor = color.Split(new char[] { ';' });
                BsonArray arrbsSize = new BsonArray();
                foreach (var i in size)
                {
                    arrbsSize.Add(i);
                }
                BsonArray arrbsColor = new BsonArray();
                foreach (var i in arrColor)
                {
                    arrbsColor.Add(i);
                }
                var document = new BsonDocument {
                {"name",product_name},
                {"prices",float.Parse(price) },
                {"size",arrbsSize },
                {"color",arrbsColor },
                {"discount",float.Parse(discount) },
                { "inventory",int.Parse(inventory)},
                {"descript",note},
                {"type",type_product},
               
            };
                var builder = Builders<BsonDocument>.Filter;
                var filter = builder.Eq("_id", ObjectId.Parse(id));
                client._database.GetCollection<BsonDocument>("products").FindOneAndUpdate(filter, document);
                return RedirectToAction("ListProduct");
            }
            catch
            {
                return RedirectToAction("ListProduct");

            }
            

        }
        [HttpPost]
        public void deleteProduct(string id)
        {
            var builder = Builders<BsonDocument>.Filter;
            var filter = builder.Eq("_id", ObjectId.Parse(id));
            client._database.GetCollection<BsonDocument>("products").FindOneAndDelete(filter);
        }

        public ActionResult partialType()
        {

            return View();
        }
    }
}