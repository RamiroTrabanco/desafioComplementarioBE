import { productsModels } from "../models/products.model.js";

export default class ProductManager{
    async addProducts(prod){
        try {
            const newProd = await productsModels.create(prod)
            return newProd
        } catch (error) {
            return error
        }
    }

    async getProducts(){
        try {
            const productsDB = await productsModels.find({})
            return productsDB            
        } catch (error) {
            return error
        }
    }

    async getProductsById(id){
        try {
            const prodByIdDB = await productsModels.findById(id)
            return prodByIdDB
        } catch (error) {
            return error
        }
    }

    async updateProduct(prod){ 
        try {
            const prodToUpdate = await productsModels.findById(prod.id)
            const newProd = {
                title: prod.title ? prod.title : prodToUpdate.title,
                description: prod.description ? prod.description : prodToUpdate.description,
                price: prod.price ? prod.price : prodToUpdate.price,
                stock: prod.stock ? prod.stock : prodToUpdate.stock,
                code: prod.code ? prod.code : prodToUpdate.code,
                category: prod.category ? prod.category : prodToUpdate.category,
                status: true,
                thumbnails: prod.thumbnails ? prod.thumbnails : prodToUpdate.thumbnails || " ",
                id: prod.id
            }
            const deleteProd = await this.deleteProduct(prodToUpdate)
            const addNewProd = await this.addProducts(newProd)
            return newProd
        } catch (error) {
            return error
        }
    }

    async deleteProduct(prod){
        try {
            const deleteProd = await productsModels.deleteOne({_id:prod.id})
            return deleteProd
        } catch (error) {
            return error
        }
    }
}