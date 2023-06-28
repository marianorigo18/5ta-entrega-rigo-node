import mongoose from "mongoose";

const collection = "products"

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: Number,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export const productsModel = mongoose.model(collection, ProductsSchema);