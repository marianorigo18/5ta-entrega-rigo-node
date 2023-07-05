import { Router } from 'express';
import __dirname from "../utils.js"

import ProductsManager from '../daos/mongodb/ProductsManager.js';
import ManagerMessage from '../daos/mongodb/MessageManager.js';

const productsManger = new ProductsManager();
const managerMessage = new ManagerMessage();

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

router.get("/chat", async (req, res) =>{

    // Traigo los mensajes:
    const messages = await managerMessage.seeMessage();

    // Renderizo la vista del chat con los Mensajes Actualizados:
    res.render("chat", { style: "home.css", title: "Mensajes Actualizados", messages });

})

export default router;