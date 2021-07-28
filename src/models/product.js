import Mongoose from "mongoose";
const Schema = Mongoose.Schema;
const schemaTemplate = {
  name: {
    type: String,
    required: true,
  },
  description: {
    trype: String,
    // default: "Loream ipsum dolor sit. Loream dolor eluar hiyat hijam sit.",
  },
  img: {
    type: String,
    default: "https://picsum.photos/300",
  },
  price: {
    type: Number,
    default: 0,
  },
};
const options = { timestamps: true, skipVersioning: { dontVersionMe: true } };
const ProductSchema = new Schema(schemaTemplate, options);
const Product = Mongoose.model("product", ProductSchema);

export default Product;
