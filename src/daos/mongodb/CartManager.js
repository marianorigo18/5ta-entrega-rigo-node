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
    const cart = await this.consultarCartPorId(idCart)
    let exist = cart.products.find((prod)=>{
      return prod.product.id === idProduct
    })
    if(!exist){
    const product = await this.productManager.getProductById(idProduct);
    cart.products.push({product: product, quantiy: 1})
    }else{
    exist.quantiy +=1
    }
    await cart.save();
    return;
  }

  deleteProductFromCart = async (idCart, idProduct) => {
    const cart = await this.consultarCartPorId(idCart)
    cart.products.pull(idProduct)
    await cart.save();
    return;
  }

  deleteAllProductFromCart = async (idCart) => {
    const cart = await this.consultarCartPorId(idCart)
    cart.products = [];
    await cart.save();
    return;
  }

  updateCart = async (cid, updateCartFields) =>{
    let result = await cartModel.updateOne({
      _id: cid
    }, {
      $set: updateCartFields
    });
    await cart.save();
    return result;
  }

  updateProductToCart = async (cid, pid, updatedProdInCart) => {
    const cart = await this.getProductById(cid);
    const product = cart.products.find((p) => p._id.toString() === pid);
    product.quantity = updatedProdInCart.quantity;
    await cart.save();
    return cart;
  }
}