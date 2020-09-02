const db = require('../models')
const bcrpyt = require('bcrypt')
const uuid = require('uuid4')

const get = async (req, res) => {
    id = req.params.id
    try {
        const user = await db.User.findByPk(id, {raw: true, nest: true})
        res.render('user_detail', {user})
    } catch (e) {
        console.log(e)
    }
}

const post = async (req, res) => {
    const { username, email, date_birth } = req.body
    const password = bcrpyt.hashSync(req.body.password, 10)
    const upload = req.files.photo
    const splitName = upload.name.split('.')
    const ext = splitName[splitName.length-1]
    const fileName = uuid()+'.'+ext

    upload.mv('./uploads/'+fileName)
    const user = await db.User.create({ username, password, email, avatar: fileName, date_birth })
    if(user) res.redirect(`/user/${user.id}`)
    else {
        const notif = {
            e : 'updating failed, try again'
        }
        res.render('dashboard', notif)
    }
}

module.exports = {
    get,
    post
}