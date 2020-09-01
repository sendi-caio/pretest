const express = require('express')
const app = express()
const hbs = require('express-hbs')
const bodyParser = require('body-parser')
const bcrpyt = require('bcrypt')

const db = require('./models')
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)
const sequelizeSessionStore = new SessionStore({
    db: db.sequelize,
})

const port = 4000

app.engine('hbs', hbs.express4({
    defaultLayout: __dirname+'/views/default.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
    store: sequelizeSessionStore
    }))
app.use(bodyParser.urlencoded({ extended: false }))

// Route
app.get('/checkdb', async (req,res) => {
    try {
        await db.sequelize.authenticate()
        res.send('connected')
    } catch (err) {
        console.log(err)
        res.send('disconnected')
    }
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', async (req,res) => {
    const { email, password } = req.body
    try {
        const user = await db.User.findOne({ where : {email} })
        if(user && bcrpyt.compareSync(password, user.password)) {
            req.session.username = user.username
            req.session.save(() => {
                res.render('dashboard')
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
})

app.get('/logout', (req, res) => {
    req.session.username = undefined
    req.session.destroy(function(err) {
        res.redirect('/login')
    })
})

// Ga bisa masuk dashboard kalau belum login
app.get('/', (req,res) => {
    if(req.session.username) res.render('dashboard')
    else {
        const notif = {
            e : 'not allowed, you must login first'
        }
        res.render('login', notif)
    }
})

app.listen(port, () => {
    console.log('listening to port '+port)
})