const admin = require("firebase-admin");
const serviceAccount = require('../../config/firebaseconfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coinsaverapp.firebaseio.com"
});

var auth = admin.auth();
var db = admin.database();

var ref = db.ref('users/')

ref.once("value", snapshot => {
  const user = snapshot.val();
  if (user){
    console.log('Your current database is: ', snapshot.val());
  } else {
    // ctrl.writefbUser('works','true')
    console.log('something broken')
  }
})
