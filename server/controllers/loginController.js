const User = require('../models/user');
const salt = require('../helpers/salt');
const encryptme = require('../helpers/encryptme');
const jwt = require('jsonwebtoken');

var getuser = (req, res) => {
  User.find({})
  .then(result=>res.send(result))
}

var signUp = (req, res) => {
  let garam = salt().toString()
  let pass = encryptme(req.body.password, garam)
  let data = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: pass,
    secret: garam,
    role: 'admin'
  }
  User.create(data)
  .then(dataUser => res.send(req.body))
  .catch(err => res.send(err))
}

var signIn = (req, res) => {
  //cek usernmae
  User.find({
        email: req.body.email
  })
  .then(dataUser => {
    console.log('hasil : ', dataUser);
    // cek password
    if(dataUser.length > 0){
      let pass = encryptme(req.body.password, dataUser[0].secret)
      if(dataUser[0].password == pass){
        var makeToken = {
          id: `${dataUser[0].id}`,
          fullname: `${dataUser[0].fullname}`,
          email: `${dataUser[0].email}`,
          role: `${dataUser[0].role}`
        }
        var token = jwt.sign(makeToken, 'thesecret');

        res.send({pesan: 'sukses', Auth: token})
      } else {
        res.send('password salah')
      }
    } else {
      res.send('email tidak ditemukan')
    }
  })
  .catch(err => res.send(err))
}

// var getMap = (req, res) => {
//
// }

module.exports = {
  signUp, signIn, getuser
}
