const db = require('../models');
const salt = require('../helpers/salt');
const encryptme = require('../helpers/encryptme');
const jwt = require('jsonwebtoken');
// const jwtLogin = require('../helpers/authority');

var findAll = (req, res) => {
  if(req.jwtLogin.role == 'admin'){
    db.User.findAll()
    .then(dataUser => res.json(dataUser))
  } else {
    res.send('anda tidak memiliki hak akses')
  }
}

var createData = (req, res) => {
  if(req.jwtLogin.role == 'admin'){
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role
    })
    .then(dataUser => res.json(dataUser))
  } else {
    res.send('anda tidak memiliki hak akses')
  }
}


var findById = (req, res) => {
  if(req.jwtLogin.role == 'member' || req.jwtLogin.role == 'admin'){
    db.User.find({
      where: {
        id: req.params.id
      }
    })
    .then(dataUser => res.json(dataUser))
  } else {
    res.send('anda tidak memiliki hak akses')
  }
}

var put = (req, res) => {
  if(req.jwtLogin.role == 'admin' || req.jwtLogin.role == 'member'){
    if(req.jwtLogin.role == 'admin'){
      let pass = encryptme(req.body.password, req.body.secret)
      db.User.update({
        username: req.body.username,
        password: pass,
        secret: req.body.secret,
        role: req.body.role
      },{
        where: {
          id: req.params.id
        }
      })
      .then(dataUser => res.json(dataUser))
    } else {
      let pass = encryptme(req.body.password, req.body.secret)
      db.User.update({
        username: req.body.username,
        password: pass,
        secret: req.body.secret
      },{
        where: {
          id: req.params.id
        }
      })
      .then(dataUser => res.json(dataUser))
    }
  } else {
    res.send('anda tidak memiliki hak akses')
  }
}

var destroy = (req, res) => {
  if(req.jwtLogin.role == 'admin'){
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dataUser => res.send(`data id ${req.params.id} sudah dihapus`))
  } else {
    res.send('anda tidak memiliki hak akses')
  }
}

module.exports = {
  findAll, findById, createData, put, destroy
}
