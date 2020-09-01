const db = require('../models')
const bcrypt = require('bcrypt')

const get_login = (req, res) => {
    res.render('pages/login')
}

const post_login = async (req, res) => {
    // res.send('OK')
    const { name, password } = req.body
    console.log(name)
    console.log(password)
    

    
    const user = await db.User.findOne({
        where: {
            name: name
        }
    })

    // res.send(user)
    console.log(user)
    // console.log(user.name)
    // console.log(user.password)

    if(user && bcrypt.compare(password, user.password)) {
        res.redirect('/dashboard')
    }

    // if (user != user.name) {
    //     res.redirect('/login')
    // } else if (bcrypt.compare(password, user.password)) {
    //     return true;
    // }

}

module.exports = {
    get_login,
    post_login
}