import fs from 'fs';
import {v4 as uuidV4} from "uuid"
const path = "src/clases/files/products.json"

export default class ProductsManager{

    getProducts = async (limite) => {
        if(fs.existsSync(path)){
            const users = await fs.promises.readFile(path, "utf-8");
            const usersFormat = await JSON.parse(users)
            if(limite){
                const productsLimite = usersFormat.slice(0, limite)
                return productsLimite
            }
            return usersFormat;
        }else{
            return [];
        }
    }

    createProducts = async (info) => {
        if( info.title == null ||
            info.description == null ||
            info.price == null ||
            info.stock == null ||
            info.code == null){
            return "Debe completar todos los campos por favor";
        }

        if(!info.thumbnail){
            info.thumbnail = [];
        }

        if(!info.status){
            info.status = true;
        }

        const productsContent = await this.getProducts()
        const productContent = productsContent.find((prod)=> prod.code == info.code)
        if(productContent){
            return `ya existe un producto con el code ${info.code}`
        }

        const product = info

        product.id = uuidV4()

        /*if(this.products.length == 0){
            product.id = 1
        }else{
            product.id = this.products[this.products.length-1].id + 1
        }*/

        productsContent.push(product)

        await fs.promises.writeFile(path, JSON.stringify(productsContent, null, "\t"));

        return `nuevo producto agregado con code ${info.code}`
    }

    getProductByCode = async (code) => {
        const products = await this.getProducts()
        const product = products.find((prod)=> prod.code == code)
        if(!product){
            console.log(`no se encontro el producto con code ${code}`)
            return;
        }
        return product
    } 

    // getProductById = async (id) => {
    //     const products = await this.getProducts()
    //     const result = products.filter((prod) => prod.id == id)
    //     if(result.length == 0){
    //         // console.log(`no se encontro el producto con id ${id}`)
    //         return `no se encontro el producto con id ${id}`;
    //     }
    //     return result
    // }

    getProductById = async (id) => {
        const products = await this.getProducts();
        const result = products.find((prod) => prod.id == id);
        if (!result) {
            // console.log(`no se encontro el producto con id ${id}`)
            return `no se encontro el producto con id ${id}`;
        }
        return result;
    }
    

    deleteProductById = async (id) => {
        const products = await this.getProducts()
        console.log(products)
        let filterProduct = []
        if(products.length > 0){
            filterProduct = products.filter((prod) => prod.id !== id)
        }

        if(filterProduct.length === products.length-1){
            await fs.promises.writeFile(path, JSON.stringify(filterProduct, null, "\t"))
            return `El producto con id: ${id} fue eliminado.`
        } else {
            return `No existe producto con id: ${id}.`
        }
    }
    deleteProductByCode = async (code) => {
        const products = await this.getProducts()
        let filterProduct = []
        if(products.length > 0){
            filterProduct = products.filter((prod) => prod.code !== code)
        }

        if(filterProduct.length === products.length-1){
            await fs.promises.writeFile(path, JSON.stringify(filterProduct, null, "\t"))
            console.log(`El producto con code: ${code} fue eliminado.`);
        } else {
            console.log(`No existe producto con code: ${code}.`);
        }
    }
    updateProduct = async (id, productUpdate) => {
        if(productUpdate.id){
            return "no se pueden actualizar los ids"
        }
        const products = await this.getProducts()
        if(products.length > 0){
            const productIdx = products.findIndex((p)=> p.id === id)
            if(productIdx === -1){
                console.log("no existe el producto con indice " + id)
                return;
            }
            if(products[productIdx].code === productUpdate.code){
                return `Existe un producto con code: ${productUpdate.code}. No se actualiza el producto.`
            }
            // el producto buscado existe, no hay problemas con el code, entonces lo actualizo
            products[productIdx] = {...products[productIdx], ...productUpdate};
            await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"))
            // si se actualizo, logueamos por consola
            return `Producto con id: ${id} fue actualizado.`
        }else {
            // no hay productos
            return "No hay productos. No se puede realizar la actualización."
          }
    }
}

//const products = new ProductsManager()

//const env = async () => {
    //console.log(await products.getProducts())
    //console.log(await products.createProducts({title: "termica",description: "220v",price: 1500,thumbnail: "terminca.jpg",code: "abc159",stock: 15}))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc131", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc132", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc133", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc134", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc135", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc136", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc137", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc138", 15))
    //console.log(await products.createProducts("termica", "220v", 1500, "terminca.jpg", "abc139", 15))
    //console.log(await products.getProducts())
    //console.log(await products.getProductByCode("abc125"))
    //console.log(await products.getProductById(4))
    //console.log(await products.deleteProductById("3"))
    //console.log(await products.deleteProductByCode("abc126"))
    //console.log(await products.updateProduct(2, {code: "abc131"}))
//}

//env()