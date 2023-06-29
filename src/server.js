import express from "express";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import ProductsManager from "./daos/mongodb/ProductsManager.js";

import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/cart.router.js";
import routerViews from "./routes/views.router.js";


const app = express();

app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");  

const expressServer = app.listen(8081, ()=>{console.log("escuchando")});
const socketServer = new Server(expressServer);

socketServer.on("connection", async(socket)=>{
    console.log(`Nuevo cliente conectado ${socket.id}`)

    const productsManger = new ProductsManager()
    // le envío todos los productos que tengo al cliente para que muestre en la vista
    socket.emit("update-products", await productsManger.getProducts())

    // agrego el producto 
    // le mando la lista de productos actualizada a la vista para que actualice la vista
    socket.on("add-product", async (productData) => {
        await productsManger.createProducts(productData)
        socketServer.emit("update-products", await productsManger.getProducts())
      })

    // elimina un producto 
    // envío productos a la vista para que actualice 
    socket.on("delete-product", async (productID) => {
    await productsManger.deleteProductById(productID)
    socketServer.emit("update-products", await productsManger.getProducts())
    })
})

app.use((req, res, next) => {
  req.socketServer = socketServer;
  next()
})

app.use("/", routerViews)
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)