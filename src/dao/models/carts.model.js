import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:{
        type: Array
    }
})

export const cartsModel = mongoose.model("Carts", cartSchema)