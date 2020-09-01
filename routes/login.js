const db = require('../models')

const get_login = (req, res) => {
    res.render('pages/login')
}

const post_login = async (req, res) => {
    // res.send('OK')
    

}

module.exports = {
    get_login,
    post_login
}