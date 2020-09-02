const bcrypt = require('bcrypt')
const db = require('../models')

const get = (req, res) => res.render('pages/login')

const post = async (req, res) => {
    const { email, password } = req.body
    const user = await db.User.findOne({ where: { email } })
    if (user && bcrypt.compareSync(password, user.password))
        req.session.user = user,
            req.session.save(() => res.redirect('/dashboard'))
    else {
        res.redirect('/login')
    }
}

module.exports = {
    get,
    post
}