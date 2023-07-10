import  { FilterQuery, UpdateQuery, QueryOptions } from "mongoose"
import Product, { ProductDocument } from "../model/product.model"

export async function createProduct(input: Omit<ProductDocument, "createdAt" | "updatedAt">) {
    return Product.create(input)
}

export async function findProduct(   query: FilterQuery<ProductDocument>,
    options: QueryOptions = {lean: true}) {
     return Product.findOne(query, {}, options)
}

export async function findAndUpdateProduct(query: FilterQuery<ProductDocument>,
update: UpdateQuery<ProductDocument>,
     options: QueryOptions
) {
        return Product.findOne(query, update, options)    
}

export async function deleteProduct(   query: FilterQuery<ProductDocument>) {
    return Product.deleteOne(query)
}