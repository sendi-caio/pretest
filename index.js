const express = require ('express')
const app = express()
const portfinder = require ('portfinder')
const port = 4000

app.get('/',  (req,res)=> res.send('server'))
app.get ('/login',(req,res) =>res.send('login'))
app.get('/dashboard',(req,res) =>res.send('dashboard'))



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


