const db = require('../models')
const bcrypt = require('bcrypt')

const get_login = (req, res) => {
    res.render('pages/login')
}

const post_login = async (req, res) => {
    // res.send('OK')
    const { name, password, email } = req.body
    console.log(name)
    console.log(password)
    

    
    const mail = await db.User.findOne({
        where: {
            email: email
        }
    })
    if(mail && bcrypt.compare(password, mail.password)) {
        req.session.user = mail
        res.redirect('/dashboard')
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    get_login,
    post_login
}