var express = require('express');
var router = express.Router();
require('dotenv').config()
var Nexmo = require('nexmo')
var nexmo = new Nexmo({
    apiKey:process.env.KEY_NEXMO,
    apiSecret:process.env.SECRET_NEXMO,
});

router.get('/', function(req,res){
    res.render('form-sms')
})

router.post('/', function(req,res){
    var from = 'Tenyo-Apps'
    var to = req.body.no_hp
    var text = req.body.text
    nexmo.message.sendSms(from, to, text)
    res.send('sms berhasil dikirim')
})

module.exports = router;
