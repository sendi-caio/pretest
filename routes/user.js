const get_user = (req, res) => {
    res.render('pages/formCreate')
}

const post_user = async (req, res) => {
    avatarRaw = req.files.avatar

    if (req.files && avatarRaw) {
        avatarRaw = avatarRaw.name
        getExt = avatarRaw.split('.').pop()
        const { v4: uuidv4 } = require('uuid')
        const avatarHash = `${uuidv4()}.${getExt}`

        avatarRaw = req.files.avatar
        avatarRaw.mv('./uploads/' + avatarHash)

        const users = req.body
        users.avatar = avatarHash

        const db = require('../models')
        const user = await db.User.create(users)
        if (user) {
            res.redirect(`/user/${user.id}`)
        } else {
            res.redirect('/user/create')
        }
    }
}

const detail_user = async (req, res) => {
    id = req.params.id
    const db = require('../models')
    const user = await db.User.findByPk(id, { nest: true, raw: true })
    user.avatar = `/uploads/${user.avatar}`
    res.render('pages/detailUser', { user })
}

module.exports = {
    get_user,
    post_user,
    detail_user
}