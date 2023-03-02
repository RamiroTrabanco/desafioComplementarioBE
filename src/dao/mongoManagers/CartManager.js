import { cartsModel } from "../models/carts.model.js";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager

export default class CartManager{
    async getCarts(){
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (error) {
            return error
        }
    }

    async getCartsById(id){
        try {
            const cartById = await cartsModel.findById(id)
            return cartById
        } catch (error) {
            return error
        }
    }

    async addCart(){
        try {
            const cartToAdd = await cartsModel.create({})
            return cartToAdd
        } catch (error) {
            return error
        }
    }

    async addProductToCart(cartId, prodId){
    try {
        const cartById = await cartsModel.findById(cartId)
        const prodById = await productManager.getProductsById(prodId)
        const newProdToCart = {
            id: prodById.id,
            quantity: 1
        }
        const newCart = cartById
        const findProdOnCart = cartById.products.find(prod=>prod.id===prodId)
        if (findProdOnCart === undefined) {
            newCart.products.push(newProdToCart)
            return await cartById.updateOne(newCart)
        } else {
            newProdToCart.quantity++
            const findQuant = cartById.products.find(prod=>prod.quantity===newProdToCart.quantity-1)
            const indexQuantUpdate = cartById.products.indexOf(findQuant)
            cartById.products.splice(indexQuantUpdate, 1)
            newCart.products.push(newProdToCart)
            return await cartById.updateOne(newCart)
        }
    } catch (error) {
        return error
    }
    }
}