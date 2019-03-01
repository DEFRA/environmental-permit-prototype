var express = require('express')
var router = express.Router()

router.use(function (req, res, next) {
  res.locals.hostname=process.env.THISHOST
  next()
});


// anything beginning with "/vn" will go into this
router.use('/v24', require('./routes_v24'))


// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router
