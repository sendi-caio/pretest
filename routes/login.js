const db = require('../models')
const bcrpyt = require('bcrypt')

const get = (req,res) => {
    res.render('login')
}

const post = async (req,res) => {
    const { email, password } = req.body
    try {
        let user = await db.User.findOne({ where : {email} }, {raw: true, nest: true})
        if(user && bcrpyt.compareSync(password, user.password)) {
            req.session.username = user.username
            req.session.id_user = user.id.toString()
            req.session.save(() => {
                res.redirect('/')
            })
        }
        else {
            const notif = {
                e : 'invalid login, check your email or password'
            }
            res.render('login', notif)
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    get,
    post
}