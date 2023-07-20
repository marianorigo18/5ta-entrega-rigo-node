import { Router } from "express";
import ManagerCarts from "../daos/mongodb/CartManager.js";
const router = Router();
const managerCarts = new ManagerCarts();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await managerCarts.consultarCartPorId(id);
  res.send(cart);
});
//trera el carrito por su id (funciona)

router.get("/", async (req, res) => {
  const carts = await managerCarts.consultarCarts();
  if(!carts){
    res.send("no se encontro el carrito")
  }
  res.send(carts);
});
//traera todos los carritos (funciona)

router.post("/", async (req, res) => {
  await managerCarts.crearCart();
  res.send({ status: "success" });
});
//crear carrito (solo lo crea) (funciona)

 router.post("/:cid/product/:pid", async (req, res) =>{
    const cartId = req.params.cid;
    const productId = req.params.pid;

    await managerCarts.agregarProductoEnCarrito(cartId, productId)
    res.send({status: "success"})
 })
//enviamos el idToCart y idToProduct agrega un producto al carrito (funciona)

 router.delete("/:cid", async (req, res) =>{
    const cartId = req.params.cid;

    await managerCarts.deleteAllProductFromCart(cartId)
    res.send({status: "success"})
 })
 //elimina todos los productos del cart mediante el id (funciona)

 router.delete("/:cid/product/:pid", async (req, res) =>{
  const cartId = req.params.cid;
  const productId = req.params.pid;

  await managerCarts.deleteProductFromCart(cartId, productId)
  res.send({status: "success"})
})
//eliminaos un producto del carrito (funciona)

router.put("/:cid", async (req, res)=>{
  try{
    res.send("Hello from put cart")
  }catch{
  }
})
//actualiza el carrito el contenido de un carrito

export default router;