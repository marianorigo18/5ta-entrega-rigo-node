import express from "express";
import routerProducts from "./routes/products.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/products", routerProducts)

app.listen(8081, ()=>{
    console.log("escuchando")
})