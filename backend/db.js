const admin = require('firebase-admin');
const serviceAccount = require('./digital-door-d0ace-firebase-adminsdk-34ysd-e69d7c3f19.json');

const firebaseConfig = {
  apiKey: "AIzaSyDXI9YW8HuEkn_KVUrU-LC5m1HwN1QEgO8",
  authDomain: "jsom-c23a1.firebaseapp.com",
  databaseURL: "https://jsom-c23a1-default-rtdb.firebaseio.com",
  projectId: "jsom-c23a1",
  storageBucket: "jsom-c23a1.appspot.com",
  messagingSenderId: "737204936841",
  appId: "1:737204936841:web:7f455db2a0301887bba658",
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
