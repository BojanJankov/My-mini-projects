import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

export const Product = model("Product", productSchema);
