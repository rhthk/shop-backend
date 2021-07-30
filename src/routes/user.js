import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { validateSignup, validateLogin } from '../core/validation.js';
const router = express.Router();

// route forbidden
// /User/
router.get('/', (req, res) => {
  res.status(401).send({ error: 'you are not authorized' });
});

// route for login
// "/user"
router.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body.email);
    const { status, message } = validateLogin(req.body);
    if (!status) return res.send(message);
    if (user === null) return res.status(401).send({ error: 'user not found' });
    else {
      if (await bcrypt.compare(req.body.password, user.password))
        return res.send({ uid: user._id });
      else return res.status(401).send({ error: 'Not authorized' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

// route for signup
// "/user/signup"
router.post('/', async (req, res) => {
  console.log(req.body);
  const { status, message } = validateSignup(req.body);
  if (!status) return res.send(message);
  try {
    const result = await User.findOne({ email: req.body.email });
    if (result !== null) return res.send({ error: 'Already a user' });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = User({
      name: { first: req.body.first, last: req.body.last },
      email: req.body.email,
      password: hashedPassword
    });
    await newUser.save();
    return res.status(201).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

export default router;
