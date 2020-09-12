const dashboard = (req,res) => {
    if(req.session.username) {
        const data = {
            user: req.session.username,
            id: req.session.id_user
        }
        res.render('dashboard', {data})
    }
    else {
        const notif = {
            e : 'not allowed, you must login first'
        }
        res.render('login', notif)
    }
}

module.exports = dashboard