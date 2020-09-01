const db = require('../models')
const bcrypt = require('bcrypt')

const get = (req, res) => {
  res.render('login')
}

const post = async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.body.email }})

  if(user && bcrypt.compareSync(req.body.password, user.dataValues.password)){
    res.redirect('/dashboard')
  }else {
    res.redirect('/login')
  }
}

module.exports = {
  get,
  post
}