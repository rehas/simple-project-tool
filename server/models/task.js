const mongoose = require('mongoose');

const task = mongoose.model('task', { 
  title : String,
  description : String,
  section : String,
  date: { type: Date, default: Date.now }
});

var exports = module.exports

exports.task = task
