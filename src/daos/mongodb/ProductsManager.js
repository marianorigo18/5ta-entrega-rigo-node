import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";

export default class ProductsManager{
    connection = mongoose.connect("mongodb+srv://marianowagnerrigo18:Marawarigo3360@cluster0.xjgkqac.mongodb.net/")

    getProducts = async (limite) => {
        let result = await productsModel.find()
        return result
    }

    createProducts = async (product) => {
        let result = await productsModel.create(product)
        return result
    }

    getProductById = async (id) => {
        let result = await productsModel.find({_id: id})
        return result
    }
    
    updateProduct = async (id, productUpdate) => {
        let result = await productsModel.updateOne(
            { _id: id },
            { $set: productUpdate}
        )
        return result
    }

    deleteProductById = async (id) => {
        let result = await productsModel.deleteOne({_id: id})
        return result
    }
}