import express from "express";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import viewsUsers from "./routes/users.router.js";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)

const users = [
    {
      name: "John",
      last_name: "Doe",
      age: 25,
      email: "john.doe@example.com",
      phone: "123-456-7890"
    },
    {
      name: "Jane",
      last_name: "Smith",
      age: 30,
      email: "jane.smith@example.com",
      phone: "987-654-3210"
    },
    {
      name: "Alice",
      last_name: "Johnson",
      age: 35,
      email: "alice.johnson@example.com",
      phone: "555-123-4567"
    }
  ];
  
  app.use("/", viewsRouter)
  app.use("/api/users", viewsUsers)

/*app.get("/", (req, res) => {
    const random = Math.floor(Math.random()*users.length )
    res.render("users", {
        user: users[random]
    })
})*/

app.listen(8081, ()=>{
    console.log("escuchando")
})