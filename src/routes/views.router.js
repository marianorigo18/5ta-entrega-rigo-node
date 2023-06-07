import { Router } from 'express';
import __dirname from "../utils.js"

import ProductsManager from '../clases/ProductsManager.js';

const productsManger = new ProductsManager();

const router = Router();

router.get("/", async (req, res) => {
    const products = await productsManger.getProducts(req.query.limit)
    res.render("home",{
        title: "inicio",
        products: products
    });
});

router.get("/realtimeproducts", async(req, res)=>{
    res.render("realTimeProducts")
})

export default router;