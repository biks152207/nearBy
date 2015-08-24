'use strict';

var _ = require('lodash');
var request = require('request');
var config = require('../../config/environment');
var ktmLocation = '28.0,84.0';
var radius = '5000';
var Search = require('./search.model');

// Get list of searchs
exports.index = function(req, res) {
  var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?location=27.7000,85.3333&radius=1&query=' + req.query.query + '&key=' + config.googleMapApiKey;
  console.log(url);
  request(url,function(err,response,body){
    res.send(body);
  });
};

// Get a single search
exports.show = function(req, res) {
  Search.findById(req.params.id, function (err, search) {
    if(err) { return handleError(res, err); }
    if(!search) { return res.send(404); }
    return res.json(search);
  });
};

// Creates a new search in the DB.
exports.create = function(req, res) {
  Search.create(req.body, function(err, search) {
    if(err) { return handleError(res, err); }
    return res.json(201, search);
  });
};

// Updates an existing search in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Search.findById(req.params.id, function (err, search) {
    if (err) { return handleError(res, err); }
    if(!search) { return res.send(404); }
    var updated = _.merge(search, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, search);
    });
  });
};

// Deletes a search from the DB.
exports.destroy = function(req, res) {
  Search.findById(req.params.id, function (err, search) {
    if(err) { return handleError(res, err); }
    if(!search) { return res.send(404); }
    search.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}