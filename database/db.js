var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Number,
  username: String,
  coinbase_id: String,
  email: String,
  userLevel: Number,
  userType: String,
  userSignupDate: { type: Date, default: Date.now },
  isNewCoinbaseUser: Boolean, 
  refcode: String,
  refby: String,
  usersettings: Schema.Types.Mixed,
  ethpercent: Number,
  statsTotalEthBought: Number,
  statsTotalBtcBought: Number,
  statsTotalPaid: Number,
})

var ScheduleSchema = new Schema({
  username: String,
  coinbase_id: String,
  frequency: String,
  ethpercent: Number,
  day: String,
  amount: Number,
})

module.exports = mongoose.model('CoinUser', UserSchema);


 