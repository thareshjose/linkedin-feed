import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDWw3oO3TmIu37574c_x_wwBiBdzVY6T-c",
  authDomain: "linkedin-feed.firebaseapp.com",
  databaseURL: "https://linkedin-feed.firebaseio.com",
  projectId: "linkedin-feed",
  storageBucket: "linkedin-feed.appspot.com",
  messagingSenderId: "949805590178",
  appId: "1:949805590178:web:781d9bad10b4ca70d419fb",
  measurementId: "G-SRS55B32JN",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
