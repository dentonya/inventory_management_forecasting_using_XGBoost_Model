
import Index from "views/Index.js";
import Predictions from "views/pages/Predictions";
import Demand from "views/pages/Demand";
import Stock from "views/pages/Stock";
import Product from "views/pages/Product";

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
    component: Product,
    layout: "/admin"
  }

];
export default routes;
