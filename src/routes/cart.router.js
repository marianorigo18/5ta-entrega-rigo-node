import { Router } from "express";

import ManagerCarts from "../daos/mongodb/CartManager.js";

const router = Router();

const managerCarts = new ManagerCarts();

 

router.get("/:id", async (req, res) => {

  const id = req.params.id;

  const cart = await managerCarts.consultarCartPorId(id);

  res.send(cart);

});

 

router.get("/", async (req, res) => {

  const carts = await managerCarts.consultarCarts();
  if(!carts){
    res.send("no se encontro el carrito")
  }

  res.send(carts);

});

 

router.post("/", async (req, res) => {

  await managerCarts.crearCart();

  res.send({ status: "success" });

});

 router.post("/:cid/product/:pid", async (req, res) =>{
    const cartId = req.params.cid;
    const productId = req.params.pid;

    await managerCarts.agregarProductoEnCarrito(cartId, productId)
    res.send({status: "success"})
 })

 router.delete("/:cid/product/:pid", async (req, res) =>{
    const cartId = req.params.cid;
    const productId = req.params.pid;

    await managerCarts.deleteProductFromCart(cartId, productId)
    res.send({status: "success"})
 })

 router.delete("/:cid", async (req, res) =>{
    const cartId = req.params.cid;

    await managerCarts.deleteAllProductFromCart(cartId)
    res.send({status: "success"})
 })

 

 

export default router;