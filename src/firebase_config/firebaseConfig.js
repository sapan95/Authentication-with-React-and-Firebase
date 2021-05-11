import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAceg42Mefn2MMmOe7R0Ms4iIg9vB5SfHg",
    authDomain: "react-auth-26ab2.firebaseapp.com",
    projectId: "react-auth-26ab2",
    storageBucket: "react-auth-26ab2.appspot.com",
    messagingSenderId: "523194377004",
    appId: "1:523194377004:web:480773ad94795782664289",
    measurementId: "G-CP97WVVL6F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;