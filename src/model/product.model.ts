import mongoose from "npm:mongoose@^6.7";
import { UserDocument } from "./user.model";
// @deno-types="npm:@types/nanoid@^3.0.0",
import { customAlphabet } from "npm:nanoid^4.0.2";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export interface ProductInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: string;
  image: string;
  timestamps: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
