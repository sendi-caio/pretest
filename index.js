const express = require('express')
const app = express()
const port = 4000
const hbs = require('express-hbs');
const login = require('./routes/login')
const bodyParser = require('body-parser')

const path = require('path')
const rootpath = path.resolve(__dirname)
const viewpath = path.join(rootpath, 'views')

app.engine('hbs', hbs.express4({
    partialsDir: path.join(viewpath, 'components'),
    layoutsDir: path.join(viewpath, 'layouts'),
    defaultLayout: path.join(viewpath, 'layouts', 'default.hbs')

}))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.send('server'))
app.get('/login', login.get)
app.post('/login',login.post)
app.get('/dashboard', (req, res) => res.send('dashboard'))

app.listen(port, () => { })
