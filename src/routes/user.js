import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
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
    if (user === null) return res.status(401).send({ error: 'user not found' });
    else {
      if (await bcrypt.compare(req.body.password, user.password))
        return res.send('Loged in');
      else return res.status(401).send({ error: 'Not authorized' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
  res.end();
});

// route for signup
// "/user/signup"
router.post('/', async (req, res) => {
  //TODO validation
  try {
    const result = await User.findOne({ email: req.body.email });
    if (result !== null)
      return res.status(200).send({ error: 'Already a user' });
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
