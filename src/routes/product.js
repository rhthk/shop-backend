import express from 'express';
import Product from '../models/product.js';
const router = express.Router();
// route for all product
// /products/
router.get('/', (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

// route for single product
// "/products/:id"
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});
// "/products/"
router.post('/', (req, res) => {
  //TODO ADD VALIDATION
  const product = new Product({
    name: req.body.name,
    price: 700,
    description: req.body.description,
    img: req.body.img
  });
  product
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

// route to delete product
// // "/products/:id"
router.delete('/:id', (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => res.send(err));
});

//Troute to update products
// "/products/:id"
router.put('/:id', (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };
  Product.findByIdAndUpdate(req.params.id, product, (err, product) =>
    res.send({ err, product })
  );
});
export default router;
