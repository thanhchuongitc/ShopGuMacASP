using MongoDB.Driver;
using ShopGumac.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Bson;
using ShopGumac.App_Start;

namespace ShopGumac.Controllers
{
    public class CartController : Controller
    {
        MongoContext cl;
        public CartController()
        {
            cl = new MongoContext();
        }
        [HttpPost]
        public int AddCart(string id,string size,string quantity,string color,string name,string amount,string discount,string image)
        {
                if (Session["cart"] == null)
                    Session["cart"] = new List<CartModel>();
                List<CartModel> lst = Session["cart"] as List<CartModel>;
                CartModel t = lst.Find(p=> (p.ids == id) && (p._size == size));
                if (t == null)
                {
                    t = new CartModel();
                    t.ids = id;
                    t.name = name;
                    t._prices = (int.Parse(amount) * (int.Parse(discount) * 1) / 100)*int.Parse(quantity);
                    t._size = size;
                    t._color = color;
                    t._quantity = int.Parse(quantity);
                    t._image = image;
                    lst.Add(t);
                }
                else
                    t._quantity++;
                Session["cart"] = lst;
                return 1;
        }
        [HttpPost]
        public string subCart(string id)
        {
            List<CartModel> lst = Session["cart"] as List<CartModel>;
            CartModel t = lst.Find(p => p.ids == id);
            string name = t.name;
            lst.Remove(t);
            Session["cart"] = lst;
            if (lst.Count <= 0)
                Session["cart"] = null;
            return name;
        }

        public ActionResult index()
        {
            ViewBag.price = 0;
            if (Session["cart"]!=null)
            {
                List<CartModel> lst = Session["cart"] as List<CartModel>;
                foreach (var i in lst)
                    ViewBag.price += i._prices;

            }
            return View();
        }

        public string BuyProduct(string name,string add,string email,string phone,string note)
        {
            List<CartModel> lst = Session["cart"] as List<CartModel>;
            float prices = 0;
            BsonArray docDetai = new BsonArray();
            foreach (var item in lst)
            {
                BsonDocument temp = new BsonDocument
                {
                    {"id_item",item.ids},
                    {"quantity",item._quantity},
                    {"price",item._prices},
                    {"size",item._size},
                    {"color",item._color}
                };
                prices += item._prices;
                docDetai.Add(temp);
            }
            var docCustomer = new BsonDocument
            {
                {"name", name},
                {"email",email},
                {"address",add},
                {"note",note},
                {"amount",prices},
            };
            docCustomer.Add("detail",docDetai);
            cl._database.GetCollection<BsonDocument>("receipts").InsertOne(docCustomer);
            Session["cart"] = null;
            return "1";
        }
    }
}