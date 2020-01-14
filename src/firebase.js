import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
var firebaseConfig = {
    apiKey: "AIzaSyDLPaS_u8GAA_SNAlBTlYeOwVx6FA3VipA",
    authDomain: "bank-app-1c3de.firebaseapp.com",
    databaseURL: "https://bank-app-1c3de.firebaseio.com",
    projectId: "bank-app-1c3de",
    storageBucket: "bank-app-1c3de.appspot.com",
    messagingSenderId: "715634183396",
    appId: "1:715634183396:web:41705d3f172da6344270f1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase