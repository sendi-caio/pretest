const express = require('express')
const app = express()
port = 3500

app.get('/', (req, res)=> res.redirect('/login'))
app.get('/login',)
app.post('/login', )


app.listen(port, ()=>console.log(`listen to ${port} `))