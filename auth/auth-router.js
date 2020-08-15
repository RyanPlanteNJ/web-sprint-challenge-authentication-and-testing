const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const secrets = require('../config/secrets');

const Users = require('../users/users-model.js')
const { isValid, generateToken } = require('./authenticate-middleware');

router.post('/register', (req, res) => {
  const credentials = req.body;
  if(isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 12;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
    .then(user => {
      console.log(user)
      const token = generateToken(user);
      res.status(201).json({data: user, token});
    });
  } else {
    res.status(400).json({ mesage: "Give us your info or you wont be able to see funny jokes"})
  }
});

router.post('/login', (req, res) => {
  const {username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username })
    .then(([user]) => {
      console.log(user);
      if(user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "welcome to joke central", token
        });
      } else {
        res.status(401).json({message: "You gave us wrong info. What's wrong with you sir?"})
      }
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  } else {
    res.status(400).json({
      message: "Please provide correct credentials or we wont be able to help you"
    })
  }

});

module.exports = router;
