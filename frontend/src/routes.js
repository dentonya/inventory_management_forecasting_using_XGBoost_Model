
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Predictions from "views/examples/Predictions";
import Reports from "views/examples/Reports";
import Demand from "views/examples/Demand";
import Stock from "views/examples/Stock";
import Product from "views/examples/Product";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/stock",
    name: "Stock",
    icon: "ni ni-planet text-blue",
    component: Stock,
    layout: "/admin"
  },
  {
    path: "/product_demand",
    name: "Demand",
    icon: "ni ni-pin-3 text-orange",
    component: Demand,
    layout: "/admin"
  },
  {
    path: "/demand_predictions",
    name: "Predictions",
    icon: "ni ni-single-02 text-yellow",
    component: Predictions,
    layout: "/admin"
  },
  
  {
    path: "/product",
    name: "Product Sales",
    icon: "ni ni-key-25 text-info",
    component: Stock,
    layout: "/admin"
  }

];
export default routes;
