import express from "express";
import Mongoose from "mongoose";
const router = express.Router();
//TODO change db url
const uri =
  "mongodb+srv://rohithkye:UfAO1zCfpJWmJ7a0@cluster0.lqhsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
Mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = Mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mogo"));

// "/products/"
router.get("/", (req, res) => {
  console.log("get");
  res.send(Products);
});
// "/products/:id"
router.get("/:id", (req, res) => {
  const result = Products.find(function (item, index) {
    return item.id === parseInt(req.params.id);
  });
  console.log(req.params);
  console.log(result);
  res.send({ result: result });
});
// "/products/"
router.post("/", (req, res) => {
  Products.push({
    id: 1,
    name: req.body.name,
    price: req.body.price,
    category: 1,
    description: req.body.description,
  });
  res.send({ len: Products.length });
  console.log(Products.length);
});
// "/products/:id"
router.delete("/:id", (req, res) => {
  console.log(req.params);
  Products.splice(req.params.id, 1);
  res.send({ status: "done", len: Products.length });
});
//TODO: update products
// "/products/:id"
router.put("/:id", (req, res) => {
  res.send("update successful.... todo");
});
export default router;
