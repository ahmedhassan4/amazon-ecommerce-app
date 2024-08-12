import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    sku: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  });
const Product = mongoose.model('Product' , productSchema )
  
export default Product 
  