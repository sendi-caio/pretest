const db =require('../models')
const bcrypt = require('bcrypt')
const get = (req, res) =>{
    res.render('pages/login')
}
const post = async (req,res) =>{
    const {email,password} = req.body
    // const user = await db.User.findAll({
    //     where: {email}
    // });

    // if(user && bcrypt.compareSync(password,req.body.password) ) {
    //     res.redirect('/dashboard')
    // }else{
    //     res.redirect('/login')
    // }
    



}

module.exports = {get,post}
