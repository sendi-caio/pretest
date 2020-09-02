const express = require('express')
const app = express()
const port = 3500
var hbs = require('express-hbs');
const bodyParser = require('body-parser')

// sessions
const expressSession = require('express-session');
const SessionStore = require('express-session-sequelize')(expressSession.Store);

const Sequelize = require('sequelize');
const myDatabase = new Sequelize('express_from_scratch', 'express_from_scratch', 'express_from_scratch', {
    host: 'localhost',
    dialect: 'mariadb',
});

const sequelizeSessionStore = new SessionStore({
    db: myDatabase,
});

app.use(expressSession({
    secret: 'keep it secret, keep it safe.',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
}));
// sessions

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',

    defaultLayout: __dirname + '/views/layouts/default',
    layoutsDir: __dirname + '/views/layouts',
    beautify: true
}));

// use express-fileupload
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    createParentPath: true
}));

const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.redirect('/login'))
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const checkLogIn = (req, res, next) => {
    const login = req.session.user
    if(login) next()
    else res.redirect('/login')
}
app.get('/login', login.get_login)
app.post('/login', login.post_login)
app.get('/dashboard', checkLogIn, dashboard.get_dashboard)
const logout = require('./routes/logout')
app.get('/logout', logout)

// create users
const user = require('./routes/user')
app.get('/user/create', user.get_user )
app.post('/user/create', user.post_user)
app.get('/user/:id', user.detail_user)


app.listen(port, () => console.log(`listen to ${port} `))