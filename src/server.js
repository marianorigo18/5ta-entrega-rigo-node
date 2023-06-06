import express from "express";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/cart.router.js";

import handlebars from "express-handlebars";
import __dirname from "./utils.js";

const app = express();

//configuracion de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
  

app.listen(8081, ()=>{
    console.log("escuchando")
})