const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const portfinder = require('portfinder')
const fileUpload = require('express-fileupload')
const config = require('./config')
const users = require('./users')

const hbs = require('express-hbs');
const path = require('path')
const {rootPath} = require('./helpers/helperpath')
const viewsPath = path.join(rootPath, 'views')

const checkIsLogin = require('./routes/checkIsLogin')
const dashboard = (req, res) => res.render('pages/dashboard')
const login = require('./routes/login')
const logout = require('./routes/logout')
app.use('/uploads', express.static('uploads'))
app.use(fileUpload({
    createParentPath: true,
    debug: true

}))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))


const expressSession = require('express-session')
const SessionStore = require('express-session-sequelize')(expressSession.Store)
const db = require('./models')
const sequelizeSessionStore = new SessionStore({
    db: db.sequelize,
});

app.use(expressSession({
    secret: 'keep it secret, keep it safe.',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
}));

app.engine('hbs', hbs.express4({
    partialsDir: path.join(viewsPath, 'components'),
    layoutsDir: path.join(viewsPath, 'layouts'),
    defaultLayout: path.join(viewsPath, 'layouts', 'default.hbs')
}))
app.set('view engine', 'hbs');
app.set('views', viewsPath);


//Route
app.get('/', (req, res) => res.redirect('/login'))
app.get('/login', login.get)
app.post('/login', login.post)
app.get('/dashboard', checkIsLogin, dashboard)
app.get('/logout', logout)
app.get('/users/create',users.create_get)
app.post('/users/create',users.create_post)
app.get('/users/detail/:id',users.userdetail)

app.get('/check-db', (req, res) => {
    const db = require('./models')
    db.sequelize.authenticate().then(
        () => res.send('connected'),
        () => res.send('error')
    )
})

const run = async () => {
    try {
        const port = await portfinder.getPortPromise({
            port: config.port
        })
        app.listen(port, () => console.log(`Listen on port ${port}`))
    } catch (err) {
        console.log(err)
    }
}
run()