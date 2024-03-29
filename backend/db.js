const admin = require('firebase-admin');
const serviceAccount = require('./digital-door-d0ace-firebase-adminsdk-34ysd-e69d7c3f19');
const key=process.env.api_key;
const databaseURL=process.env.DATABASE_URL;


const firebaseConfig = {
  apiKey: key,
  authDomain: "jsom-c23a1.firebaseapp.com",
  databaseURL:databaseURL ,
  projectId: "jsom-c23a1",
  storageBucket: "jsom-c23a1.appspot.com",
  messagingSenderId: "737204936841",
  appId:process.env.appID,
  measurementId: "G-5KM5VJC4Q4"
};

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const collectionRef = firestore.collection('tax');
const collectionComplain = firestore.collection('complain'); 

const toFetchDataFromDb = (collection, callback) => {
  collection.get().then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};


module.exports = {
  toFetchDataFromDb,
  collectionComplain,
  collectionRef,
  firebaseConfig,
};
