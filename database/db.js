var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Number,
  username: String,
  coinbase_id: String,
  level: String,
  refcode: String,
  refby: String,
  usersettings: Schema.Types.Mixed,
})

var ScheduleSchema = new Schema({
  username: String,
  coinbase_id: String
  frequency: String,
  day: String,
  amount: Number,
})

module.exports = mongoose.model('CoinUser', UserSchema);
