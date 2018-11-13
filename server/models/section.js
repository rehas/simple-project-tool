const mongoose = require('mongoose');

const section = mongoose.model('section', { 
  name : String,
  date: { type: Date, default: Date.now }
});

var exports = module.exports

exports.section = section

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

