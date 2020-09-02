const express = require('express')
const app = express()
const hbs = require('express-hbs')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')

const db = require('./models')
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)
const sequelizeSessionStore = new SessionStore({
    db: db.sequelize,
})

const port = 4000

app.engine('hbs', hbs.express4({
    defaultLayout: __dirname+'/views/default.hbs',
    partialsDir: __dirname+'/views/components'
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
app.use(fileupload({
    debug: true
}))
app.use('/uploads', express.static('uploads'))

// Route
const login = require('./routes/login')
app.get('/login', login.get)
app.post('/login', login.post)

const logout = require('./routes/logout')
app.get('/logout', logout)

const user = require('./routes/user')
app.get('/user/:id', user.get)
app.post('/user', user.post)

// Ga bisa masuk dashboard kalau belum login
const dashboard = require('./routes/dashboard')
app.get('/', dashboard)

/* app.get('/checkdb', async (req,res) => {
    try {
        await db.sequelize.authenticate()
        res.send('connected')
    } catch (err) {
        console.log(err)
        res.send('disconnected')
    }
}) */

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})