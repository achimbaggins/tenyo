const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  var token = req.headers.token;
  var jwtLogin = jwt.verify(token, 'thesecret', (err, decoded) => {
    if (err) {
      console.log('err: ', err);
    }
    console.log('hasilnya : ',decoded);
    req.jwtLogin = decoded
    next()
  })
}
