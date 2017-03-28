var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model("Users");
var Stores = mongoose.model("Stores");
var Reviews = mongoose.model("Reviews");
//const crypto = require("crypto");

router.get('/', function(req, res, next) {
  //res.redirect('api');
  res.render('homepage');
});

router.get('/usersSelection', function(req, res, next) {
  res.render('homepage');
});

router.get('/reviewsSelection', function(req, res, next) {
  res.render('homepage');
});

router.get('/storesSelection', function(req, res, next) {
  res.render('homepage');
});

// USERS
router.get('/users', function(req, res, next) {
  var FilterDown = {};
  for (each in req.query) {
    if (each == "firstname" || each == "lastname"
     || each == "age" || each == "sex") {
      FilterDown[each] = req.query[each];
    }
  }
  User.find(FilterDown).sort({'username' : 'asc'}).exec(function(err, userObj) {
    if (JSON.stringify(userObj) === '[]') {
      userObj = {};
    }
    var returnObj = { "users" : userObj };
    res.json(returnObj);
  });
});

router.get('/user', function(req, res, next) {
  if (req.query.id) {
      User.find({ '_id': req.query.id }, function(err, userObj) {
      if (JSON.stringify(userObj) === '[]') {
        res.status(404).send({ response: 'Does not exist!' });
      }
      else {
        res.json(userObj[0]);
      }
    })
  }
  else if (req.query.username) {
    console.log(req.query);
    User.find({ 'username': req.query.username }, function(err, userObj) {
      console.log(userObj);
      if (JSON.stringify(userObj) === '[]') {
        res.status(400).send({ response: 'Does not exist!' });
      }
      else {
        res.json(userObj[0]);
      }
    })
  }
  else {
    res.status(404).send({ response: 'Does not exist!' });
  }
});

router.post('/user', function(req, res, next) {
  if (req.body.username == "" || typeof req.body.username == 'undefined') {
    res.status(403).send({ error: 'Error! username was not provided!' });
  }
  else {
    var newUser = new User(req.body);
    newUser.save(function(err) {
      if (err) { return next(err); } // saved
    });
    res.json(newUser);
  }
});

router.delete('/user', function(req, res, next) {
  User.findOne({ '_id': req.query.id }, function(err, userObj) {
    if (JSON.stringify(userObj) === 'null') {
      res.status(404).send({ error: 'Does not exist!' });
    }
    else {
      Reviews.remove({ 'userID': req.query.id }, function(err, reviewObj) {
      });
      User.remove({ '_id': req.query.id}, function(err, userRemoveObj) {
      })
      res.status(200).send({ response: 'Success!' });
    }
  })
});

router.put('/user', function(req, res, next) {
  User.findOne({ '_id': req.query.id}, function(err, userObj) {
    if (JSON.stringify(userObj) === 'null') {
      res.status(404).send({ error: 'Does not exist!' });
    }
    else {
      for (each in req.body) {
        if (each == "firstname" || each == "lastname"
         || each == "sex" || each == "age") {
          userObj[each] = req.body[each];
        }
      }
      userObj.save(function(err) {
        if(err) { return next(err); }
      });
      res.json(userObj);
    }
  })
});



// Stores
router.get('/stores', function(req, res, next) {
  var FilterDown = {};
  for (each in req.query) {
    if (each == "category" || each == "storename") {
      FilterDown[each] = req.query[each];
    }
  }
  Stores.find(FilterDown).sort({'storename' : 'asc'}).exec(function(err, storeObj) {
    var returnObj = { "stores" : storeObj };
    res.json(returnObj);
  });
});

router.get('/store', function(req, res, next) {
  Stores.findOne({ '_id': req.query.id }, function(err, storeObj) {
    if (JSON.stringify(storeObj) === 'null') {
      res.status(404).send({ error: 'Does not exist!' });
    }
    else {
      res.json(storeObj);
    }
  })
});

router.delete('/store', function(req, res, next) {
  Stores.findOne({ '_id': req.query.id }, function(err, storeObj) {
    if (JSON.stringify(storeObj) === 'null') {
      res.status(404).send({ error: 'Does not exist!' });
    }
    else {
      Stores.remove({ '_id': req.query.id}, function(err, storeObj) {})
      res.status(200).send({ response: 'Deleted!' });;
    }
  })
});

router.put('/store', function(req, res, next) {
  Stores.findOne({ '_id': req.query.id }, function(err, storeObj) {
    if (JSON.stringify(storeObj) === 'null') {
      res.status(404).send({ error: 'Does not exist!' });
    }
    else {
      for (each in req.body) {
        if (each == "category" || each == "storename"
         || each == "address" || each == "_id") {
          storeObj[each] = req.body[each];
        }
      }
      storeObj.save(function(err) {
        if(err) { return next(err); }
      });
      res.json(storeObj);
    }
  })
});

router.post('/store', function(req, res, next) {
  if ( typeof req.body === 'undefined' || req.body.storename === ""
   || typeof req.body.storename === 'undefined') {
    res.status(403).send({ error: 'Username was not given!' });
  }
  else {
    if (typeof req.body._id === 'undefined') {
       res.status(403).send({ error: '_id was not given!' });
    }
    else {
      Stores.findOne({ '_id': req.body._id }, function(err, storeObj) {
        if (JSON.stringify(storeObj) !== 'null') {
          res.status(403).send({ error: 'This id already exists!' });
        }
        else {
          var stores = new Stores(req.body);
          stores.save(function(err) {
            if(err) { return next(err); }
          });
          res.json(stores);
        }
      })
    }
  }
});



// REVIEWS
router.post('/review', function(req, res, next) {
  Stores.find({ '_id': req.body.storeID}, function(err, reviewObj) {
    if (JSON.stringify(reviewObj) === '[]') {
      res.status(403).send({ error: 'There is no such store!' });
    }
    else {
      User.find({ '_id': req.body.userID}, function(err, userObj) {
        if (JSON.stringify(userObj) == '[]') {
          res.status(403).send({ error: 'There is no such user!' });
        }
        else {
          if (!req.body.rating || req.body.rating < 0 || req.body.rating > 10) {
            res.status(403).send({ error: 'A rating must exist, and must be between 0 and 10!' });
          }
          else {
            if (!req.body._id) {
              res.status(403).send({ error: '_id was not given!' });
            }
            else {
              var review = new Reviews(req.body);
              review.save(function(err) {
                if (err) { return next(err); }
              });
              res.json(review);
            }
          }
        }
      })
    }
  })
});

router.get('/review', function(req, res, next) {
  if (req.query.storeid) {
    Reviews.findOne({ 'storeID': req.query.storeid}, function(err, reviewObj) {
      if (JSON.stringify(reviewObj) === 'null') {
        reviewObj = {};
      }
      var returnObj = {"reviews" : reviewObj};
      res.json(returnObj);
    })
  }
  else if (req.query.userid) {
    Reviews.findOne({ 'userID': req.query.userid}, function(err, reviewObj) {
      if (JSON.stringify(reviewObj) === 'null') {
        reviewObj = {};
      }
      var returnObj = {"reviews" : reviewObj};
      res.json(returnObj);
    })
  }
  else {
    res.status(404).send({ error: 'Error!' });
  }
});

router.delete('/review', function(req, res, next) {
  if (req.query.storeid) {
    Reviews.find({ 'storeID': req.query.storeid}, function(err, reviewObj) {
      if (JSON.stringify(reviewObj) === '[]') {
        res.status(404).send({ error: 'Does not exist!' });
      }
      else {
        Reviews.remove({ 'storeID': req.query.storeid}, function(err) {
          if(err) { return next(err); }
        })
        res.send({ response: 'Success!' });
      }
    })
  }
  else if (req.query.userid) {
    Reviews.find({ 'userID': req.query.userid}, function(err, reviewObj) {
      if (JSON.stringify(reviewObj) === '[]') {
        res.status(404).send({ response: 'Does not exist!' });
      }
      else {
        Reviews.remove({ 'userID': req.query.userid}, function(err) {
          if(err) { return next(err); }
        })
        res.send({ response: 'Success!' });
      }
    })
  }
  else {
    res.status(404).send({ error: 'Error!' });
  }
});

router.put('/review', function(req, res, next) {
  Reviews.findOne({ 'username': req.query.username }, function(err, reviewObj) {
    if (JSON.stringify(reviewObj) === 'null') {
      res.status(404).send({ response: 'Does not exist!' });;
    }
    else {
      for (each in req.body) {
        if (each == "rating" || each == "comment") {
          reviewObj[each] = req.body[each];
        }
      }
      reviewObj.save(function(err) {
        if(err) { return next(err); }
      });
      res.json(reviewObj);
    }
  })
});

module.exports = router;