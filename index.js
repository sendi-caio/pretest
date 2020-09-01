const express = require('express')
const app = express()
const port = 3500
var hbs = require('express-hbs');
const bodyParser = require('body-parser')

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials',

    defaultLayout: __dirname + '/views/layouts/default',
    layoutsDir: __dirname + '/views/layouts',
    beautify: true
}));


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.redirect('/login'))
const login = require('./routes/login');
const checkLogIn = (req, res, next) => {
    const login = true
    if(login) next()
}
app.get('/login', login.get_login)
app.post('/login', checkLogIn, login.post_login)
app.get('/dashboard')


app.listen(port, () => console.log(`listen to ${port} `))