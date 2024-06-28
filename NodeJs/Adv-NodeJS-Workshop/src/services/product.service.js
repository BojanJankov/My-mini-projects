import { Product } from "../models/product.model.js";

export class ProductService {
  static async getAllProducts(filters) {
    const { sortBy, orderBy, ...basicFilters } = filters;

    const sortFilters = {};

    if (sortBy === "price") {
      if (orderBy === "asc") sortFilters.price = 1;
      if (orderBy === "desc") sortFilters.price = -1;
    }

    if (basicFilters?.stock) basicFilters.stock = { $gt: 0 };
    if (basicFilters?.rating) {
      basicFilters.rating = { $gte: Number(basicFilters.rating) };
    }

    const products = await Product.find(basicFilters).sort(sortFilters);

    const countOfDocuments = await Product.countDocuments();

    return { products, totalDoc: countOfDocuments };
  }
  static async getProductById(productId) {
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) throw new Error("Prodcut Not Found");

    return foundProduct;
  }
  static async createProduct(productData) {
    const newProduct = new Product(productData);

    const product = newProduct.save();

    return product;
  }
  static async updateProduct(productId, productUpdateData) {
    const foundProduct = await this.getProductById(productId);

    Object.assign(foundProduct, productUpdateData);

    const updatedProdcut = await foundProduct.save();

    return updatedProdcut;
  }
  static async deleteProduct(productId) {
    const deletedProdcut = await Product.findByIdAndDelete(productId);
    if (!deletedProdcut) throw new Error("Prodcut Not Found");
  }
}
