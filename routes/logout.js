const get_logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'))
}

module.exports = get_logout