import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";

export default class ProductsManager{
    connection = mongoose.connect("mongodb+srv://marianowagnerrigo18:Marawarigo3360@cluster0.xjgkqac.mongodb.net/")

    getProducts = async (
        limit = 10,
        page = 1,
        sort = 0,
        filtro = null,
        filtroVal = null
        ) => {
        let whereOption = {};
        if(filtro != "" && filtroVal != ""){
            whereOption = {[filtro]: filtroVal}
        }
        let result = await productsModel.paginate(whereOption,{
            limit: limit,
             page: page,
            sort: {price: sort}})
        return result
    }           

    createProducts = async (product) => {
        try{
            let result = await productsModel.create(product)
            return result
        }catch(e){
            console.log(e)
            return e;
        }
    }

    getProductById = async (id) => {
        let result = await productsModel.findOne({_id: id})
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