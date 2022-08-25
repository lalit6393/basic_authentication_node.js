var express = require('express');
var bodyParser = require('body-parser')
const Users = require('../models/users');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.route('/').get((req, res, next) => {
  Users.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch(err => next(err));

})
.post((req, res, next) => {
  Users.create(req.body)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, (err) => next(err))
  .catch(err => next(err));

})
.put((req, res, next) => {

  res.statusCode = 403;
  res.end('put method in not allowed on /users');

})
.delete((req, res, next) => {
  Users.remove({})
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, err => next(err))
  .catch(err => next(err));

});





router.route('/:userId')
.get((req, res, next) => {

  Users.findById(req.params.userId)
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, err => next(err))
  .catch(err => next(err));

})
.post((req, res, next) => {
  
  res.statusCode = 403;
  res.end('put method in not allowed on /users');
 
})
.put((req, res, next) => {

  Users.findByIdAndUpdate(req.params.userId, { $set: req.body}, { new: true })
  .then(user => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, err => next(err))
  .catch(err => next(err));
})
.delete((req, res, next) => {

  Users.findByIdAndRemove(req.params.userId)
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  }, err => next(err))
  .catch(err => next(err));

});

router.route('/:userId/info')
.get((req, res, next) => {
  Users.findById(req.params.userId)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user.info);
  }, (err) => next(err))
  .catch(err => next(err));

})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('put method in not allowed on /users/'+ req.params.userId);
})
.put((req, res, next) => {

  Users.findById(req.params.userId)
  .then(user => {
    if(user != null){
      user.info.firstname = req.body.firstname || user.info.firstname;
      user.info.lastname = req.body.lastname || user.info.lastname;

       user.save()
       .then(user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
       }, err => next(err))
       .catch(err => next(err));
    }else{
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end("User does not exist");
    }
  }, err => next(err))
  .catch(err => next(err));

})
.delete((req, res, next) => {
  
  res.statusCode = 403;
  res.end('put method in not allowed on /users/'+ req.params.userId);
});

module.exports = router;
