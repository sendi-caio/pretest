const db = require('./models')
const { uploadPath } = require('./helpers/helperpath')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')


const create_get = (req,res) =>{
    res.render('users/create')

}
const create_post = async(req,res) => {
    let avatar = ''
    const userdata = req.body
     if(req.files && req.files.avatar){
         const uploads = req.files.avatar
         const namearr = uploads.name.split('.')
         const ext = '.' + namearr[namearr.length -1]
         avatar = uuidv4()+ext
         uploads.mv(path.join(uploadPath,avatar))
     }
    //  const password = req.body.password
    //  userdata.password = bcrypt.hashSync(password,10)
     userdata.avatar = avatar

     const newUser = await db.User.create(userdata)
     if(newUser) res.redirect(`/users/detail/${newUser.id}`)
     else{res.send('failed') }


}

const userdetail = async(req,res) =>{
    const id = req.params.id
    const user = await db.User.findByPk(id,{
        raw: true,
        nest: true
    })
    user.avatar ='/uploads/'+user.avatar
    res.render('users/details',{user})

   


    

}

module.exports = {create_get,create_post,userdetail}