const express = require('express')
const app = express()

const config = require('./config')
const login = require('./routes/login')

const hbs = require('express-hbs');
const bodyParser = require('body-parser')


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/pages',
  defaultLayout: __dirname + '/views/layouts/default'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/login', login.get)
app.post('/login', login.post)

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

app.get('/', (req, res) => {
  res.redirect('login')
})

app.listen(config.port, () => {
  console.log('Server running at port '+ config.port);
})
