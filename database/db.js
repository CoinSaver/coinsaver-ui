var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Number,
  username: String,
  coinbase_id: String,
  plaid_user_id: String,
  plaid_account_id: String,
  email: String,
  userLevel: Number, //0, 1, 2
  userType: String, // Free, Paid, Etc
  userSignupDate: { type: Date, default: Date.now },
  isNewCoinbaseUser: Boolean, 
  usersettings: Schema.Types.Mixed,
  isPurchaseEnabled: Boolean,
  purchaseMin: Number,
  purchaseMax: Number,
  purchaseAuto: Number,
  ethpercent: Number, //0 to 1
  statsLastPurchaseUsd: Number,
  statsLastPurchaseEth: Number,
  statsLastPurchaseBtc: Number,
  statsTotalPurchaseUsd: Number,
  statsTotalPurchaseEth: Number,
  statsTotalPurchaseBtc: Number,
  refcode: String,
  refby: String,
  promocode: String,
})

var ScheduleSchema = new Schema({
  username: String,
  coinbase_id: String,
  frequency: String,
  ethpercent: Number,
  day: String,
  nextPurchaseDate: String,
  lastPurchaseDate: String,
  amount: Number,
})

const CoinUser = mongoose.model('CoinUser', UserSchema);
const CoinSchedule = mongoose.model('CoinSchedule', ScheduleSchema);


module.exports = {CoinUser, CoinSchedule}