import { Router } from "express";

const router = Router();

import ProductsManager from "../daos/mongodb/ProductsManager.js";

const productsManger = new ProductsManager()

router.get("/", async (req, res) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    let filtro = req.query.filtro;
    let filtroVal = req.query.filtroVal;
    const products = await productsManger.getProducts(limit, page, sort, filtro, filtroVal);
    res.send(products)
});

router.get("/:id", async (req, res) => {
    const productId = await productsManger.getProductById(req.params.id)
    console.log(productId)
    res.send(productId)
    //res.render("products", { product: productId });
})

router.post("/", async (req, res) => {
    const product = req.body;
    
    const newProduct = await productsManger.createProducts(product)
    const products = await productsManger.getProducts();
    req.socketServer.sockets.emit("update-products", products)
    res.send(newProduct);
})

router.put("/:id", async (req, res) => {
    const prodId = req.params.id;
    const prodUp = req.body;
    const updateProd = await productsManger.updateProduct(prodId, prodUp)
    res.send(updateProd)
})

router.delete("/:id", async (req, res) => {
    const params = req.params.id
    const productId = await productsManger.deleteProductById(params)
    res.send({productId})
})

export default router;
