var express = require('express');
var router = express.Router();
var FB = require('fb');
var fb = new FB.Facebook({version: 'v2.8'})

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBpJvN9XTwC_n_sC6pfc60Rprk8gKRr6oo'
})
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('alah')
})
router.get('/getuser', loginController.getuser);
router.post('/signup', loginController.signUp);
router.post('/signin', loginController.signIn);

router.get('/getMap', (req, res) => {
  let places = req.query.place
  googleMapsClient.places(
    {
      query:places,
      // location: ,
      radius: 10000
    }, (err, data1) => {
      if(!err){
        res.send(data1)
        }else{
          res.send(err)
        }
    })
})

var setAccessToken = (req, res, next) => {
  console.log(req.headers.fbaccesstoken,'=====');
  FB.setAccessToken(req.headers.fbaccesstoken);
  next()
}

/* GET home page. */
router.get('/facebook', setAccessToken, function(req, res) {
  FB.api('/me', {fields: ['id','name','email','picture']}, function(response){
    console.log('api me: ',response);
    res.send(response)
  })
})

router.get('/facebook/timeline', setAccessToken, function(req, res) {
  FB.api('/me/feed', function(response){
    console.log('ini feed: ',response);
    res.send(response)
  })
})

router.get('/getlocation', (req, res) => {
  googleMapsClient.geolocate({},(err, data) => {
    if(err) {
      res.send(err)
    } else {
      console.log(data);
      // let places = req.query.place
      // googleMapsClient.places(
      //   {
      //     location: data.json.location, //[-6.2603027, 106.7796143],//
      //     query:'pom bensin',
      //     radius: 0.5
      //   }, (err, data1) => {
      //     if(!err){
      //       res.send(data1)
      //       }else{
      //         res.send(err)
      //       }
      //   })
      res.send(data.json.location)
    }


  })
})


router.post('/post-facebook', setAccessToken, (req,res)=>{
  console.log('===================');

  FB.api('/me/feed','post', {
    message: req.body.status,
    link: req.body.link
  },(response)=>{
    console.log('**********', response);
    res.send(response)
  })
})
module.exports = router;
