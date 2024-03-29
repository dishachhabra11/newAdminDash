const jwt = require('jsonwebtoken');
const express = require("express");
const fb = require("./db");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();
const session = require('express-session');
const  fetchuser =require ( './middleware/fetchuser');
const JWT_SECRET="hambharatkeveerhai";

const port =process.env.PORT|| 8080;
const firestore = admin.firestore();

const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

app.use(bodyParser.json());
app.use(cors());

const membersCollection = firestore.collection("users");
const { firebaseConfig, collectionRef, collectionComplain } = require("./db");

// to check the user ?
app.use(session({
  secret: 'hambharatkeveerhai', 
  resave: false,
  saveUninitialized: true,
}));

// function to handle the login credentials
const loginWithCredentials = async (email, password) => {
  const memberSnapshot = await firebaseConfig
    .firestore()
    .collection("users")
    .where("email", "==", email)
    .get();

    if (!memberSnapshot.empty()) throw new Error("User not found ");

    const memberData = memberSnapshot.docs[0].data();

    await firebase.auth().signInWithEmailAndPassword(email, password);

    return memberData;
};


// function to check the user is authenticated or not ?
const checkuser = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// <--------API----------->



// to render the data on the client side
app.get("/maps/markers",async (req, res) => {
  try {
    fb.toFetchDataFromDb(collectionRef, (data) => {
      res.json(data);
      // console.log("legth of data is ",data.length)
    });
  } catch (error) {
    console.error("Error in fetching data", error);
    res.status(500).json({ error: "Internal server issue" });
  }
});

// to show the complain's to the admin

app.get("/maps/complains", async (req, res) => {
  try {
    fb.toFetchDataFromDb(collectionComplain, (data) => {
      res.json(data);
      // console.log("legth of data is ",data.length)
    });
  } catch (error) {
    console.error("Error in fetching data", error);
    res.status(500).json({ error: "Internal server issue" });
  }
});



app.post("/user/signin", [
  body("email", "Login with the correct credentials").exists(),
  body("password", "Minimum password length is 5 characters").isLength({
      min: 6,
  }),
],
async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
      const userDataSnapshot = await membersCollection
          .where("email", "==", email)
          .get();

      if (userDataSnapshot.empty) {
          console.error("User not found for email:", email);
          throw new Error("User data not found");
      }

      const userData = userDataSnapshot.docs[0].data();
      console.log("User Data:", userData);

      if (password !== userData.password) {
          console.error("Incorrect password for email:", email);
          throw new Error("Incorrect password");
      }

      const data = {
        name: {
          id: email.id
        }
      }

      const authtoken = jwt.sign(data,JWT_SECRET );

      res.status(200).json({
          message: "User signed in successfully",
          user: req.session.user,
          success: true,
          authtoken,
      });
  }
  catch (error) {
      console.error("Error in user login:", error);
      res.status(500).json({ error: "Internal server issue" });
  }
});

app.post('/verify', (req, res) => {
  const { authtoken } = req.body;
  try {
    const decoded = jwt.verify(authtoken, 'hambharatkeveerhai');
    res.status(200).json({ success: true, decoded });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
