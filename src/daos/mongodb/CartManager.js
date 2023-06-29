import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import ProductsManager from "./ProductsManager.js";

export default class ManagerCarts {
  connection = mongoose.connect("mongodb+srv://marianowagnerrigo18:Marawarigo3360@cluster0.xjgkqac.mongodb.net/")
  productManager = new ProductsManager();

  consultarCarts = async () => {
    const result = await cartModel.find({});
    return result
  };

  crearCart = async () => {
    const result = await cartModel.create({products: []})
    return result
  };

  consultarCartPorId = async (id) => {
    const result = await cartModel.findOne({_id: id}).populate("products.product")
    return result
  };

  agregarProductoEnCarrito = async (idCart, idProduct) => {
    const product = await this.productManager.getProductById(idProduct);
    const cart = await this.consultarCartPorId(idCart)
    cart.products.push({product: product});
    await cart.save()
    return;
  }
}