import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAcC092gDrUsSnKqmbYEMiuBZVbpmyMV2A",
    authDomain: "snapchat-clone-31828.firebaseapp.com",
    projectId: "snapchat-clone-31828",
    storageBucket: "snapchat-clone-31828.appspot.com",
    messagingSenderId: "752787071258",
    appId: "1:752787071258:web:8c5288f3b6de9fd76fcca3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider };