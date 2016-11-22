var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var Item = require('./models/item');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/items', function(req, res) {
  Item.find(function(err, items) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    console.log(items);
    res.json(items);
  });
});

app.post('/items', function(req, res) {
  Item.create({name: req.body.name}, function(err, item) {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    res.status(201).json(item);
  });
});

app.delete('/items/:id', function (req, res) {
  var query = { _id: req.params.id };
  Item.findOneAndRemove(query, function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'Not Found'
      });
    }
    res.status(200).json(item);
  });
})

app.put('/items/:id', function (req, res) {
  var query = { _id: req.params.id };
  var update = {$set: {name: req.body.name}}
  Item.findOneAndUpdate(query, update, function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'Not Found'
      });
    }
    res.status(200).json(item);
  });

  console.log(req.body);
  console.log(req.params);
});

app.use('*', function(req, res) {
  res.status(404).json({
    message: 'Not Found'
  });
});

var runServer = function(callback) {
  mongoose.connect(config.DATABASE_URL, function(err) {
    if (err && callback) {
      return callback(err);
    }

    app.listen(config.PORT, function() {
      console.log('Listening on localhost:' + config.PORT);
      if (callback) {
        callback();
      }
    });
  });
};

if (require.main === module) {
  runServer(function(err) {
    if (err) {
      console.error(err);
    }
  });
};

exports.app = app;
exports.runServer = runServer;
