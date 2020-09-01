const express = require('express')
const app = express()

const config = require('./config')

const login = require('./routes/login')

const hbs = require('express-hbs');
 
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views',
  defaultLayout: __dirname + '/views/default.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/login', login.get)
app.post('/login', login.post)

app.get('/dashboard', (req, res) => {
  res.send('dashboard')
})

app.get('/', (req, res) => {
  res.redirect('login')
})

app.listen(config.port, () => {
  console.log('Server running at port '+ config.port);
})
