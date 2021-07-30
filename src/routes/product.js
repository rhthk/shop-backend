import express from 'express';
import Product from '../models/product.js';
import { validateProduct } from '../core/validation.js';
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
router.post('/', async (req, res) => {
  const { status, message } = validateProduct(req.body);
  if (!status) return res.send(message);
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      img: req.body.img
    });
    const result = await product.save();
    res.send(result);
  } catch (err) {
    return res.status(500).send();
  }
});

// route to delete product
// // "/products/:id"
router.delete('/:id', async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    resp.status(200).send();
  } catch (err) {
    return res.status(500).send();
  }
});

//Troute to update products
// "/products/:id"
router.put('/:id', async (req, res) => {
  const { status, message } = validateProduct(req.body);
  if (!status) return res.send({ message });
  const product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };
  try {
    await Product.findByIdAndUpdate(req.params.id, product);
    res.status(204).send();
  } catch (err) {
    return res.status(500).send();
  }
});
export default router;
