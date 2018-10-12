using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopGumac.Models
{
    public class CartModel
    {
        public string ids { get; set; }
        public string _size { get; set; }
        public int _quantity { get; set; }
        public string _color { get; set; }
        public float _prices { get; set; }
        public string _image { get; set; }
        public string name { get; set; }
    }
}