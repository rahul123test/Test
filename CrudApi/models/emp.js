const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.set('useCreateIndex', true);

// Define collection and schema for Business
let Emp = new Schema({
  efname: {
    type: String
  },
  elname: {
    type: String
  },
  esalary: {
    type: Number
  },
  edob: {
    type: Date
  }
},{
  collection: 'emp'
});

Emp.plugin(AutoIncrement, {inc_field: 'eid'});

module.exports = mongoose.model('Emp', Emp);