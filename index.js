const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const hbs = require('express-hbs');
const path = require('path')
const rootPath = path.resolve(__dirname)
const viewsPath = path.join(rootPath, 'views')

app.engine('hbs', hbs.express4({
    partialsDir: path.join(viewsPath, 'components'),
    layoutsDir: path.join(viewsPath, 'layouts'),
    defaultLayout: path.join(viewsPath, 'layouts', 'default.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', viewsPath);

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


//Route
const checkIsLogin = require('./routes/checkIsLogin')
const dashboard = (req, res) => res.render('pages/dashboard')
const login = require('./routes/login');
const logout = require('./routes/logout')

app.get('/', (req, res) => res.redirect('/login'))
app.get('/login', login.get)
app.post('/login', login.post)
app.get('/dashboard', checkIsLogin, dashboard)
app.get('/logout', logout)

app.get('/check-db', (req, res) => {
    const db = require('./models')
    db.sequelize.authenticate().then(
        () => res.send('connected'),
        () => res.send('error')
    )
})

app.listen(port, () => console.log(`listen on port ${port}`))