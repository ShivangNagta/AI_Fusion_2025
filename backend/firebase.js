const admin = require("firebase-admin");
const serviceAccount = require("./template-f9b41-firebase-adminsdk-fbsvc-14fcae0c76.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
