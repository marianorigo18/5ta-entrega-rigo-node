import mongoose from "mongoose";
import { cartModel } from "./models/carts.model";

export default class ManagerCarts {
  connection = mongoose.connect("mongodb+srv://marianowagnerrigo18:Marawarigo3360@cluster0.xjgkqac.mongodb.net/")

  consultarCarts = async () => {
    const result = await cartModel.create({products: []})
    return result
  };

  crearCart = async () => {
    
  };

  consultarCartPorId = async (id) => {
  };

  agregarProductoEnCarrito = async (idCart, idProduct) => {
  }
}