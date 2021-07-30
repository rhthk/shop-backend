import express from 'express';
import User from '../models/user.js';
import Product from '../models/product.js';
const router = express.Router();
// route for all products in cart for a user
// /cart/
router.get('/:uid', async (req, res) => {
  if (req.body.pid == null)
    return res.status(400).send({ message: 'pid is null' });
  try {
    const cart = await User.cart(req.params.uid);
    const products = await Product.find({ _id: { $in: cart } });
    if (cart === null)
      return res.status(400).send({ message: 'invalid pid' }).end();
    return res.send(products);
  } catch (err) {
    resp.status(500).send().end();
  }
});

// route to add to cart
// /cart/
router.post('/:uid', async (req, res) => {
  if (req.body.pid == null)
    return res.status(400).send({ message: 'pid is null' });
  try {
    const user = await User.findById(req.params.uid);
    const item = user.cart.find((item) => item === req.body.pid);
    console.log(item);
    if (item === undefined) {
      user.cart.push(req.body.pid);
      await User.findByIdAndUpdate(req.params.uid, user);
      res.status(200).send({ message: 'added to cart' });
    } else return res.status(409).send({ message: 'already added' });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err).end();
  }
});

export default router;
