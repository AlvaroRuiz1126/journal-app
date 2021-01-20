import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBQE8z6jHtQMaWoAnYQULcIs1W9_Zlz-Ds",
    authDomain: "react-app-55abd.firebaseapp.com",
    databaseURL: "https://react-app-55abd.firebaseio.com",
    projectId: "react-app-55abd",
    storageBucket: "react-app-55abd.appspot.com",
    messagingSenderId: "363670284184",
    appId: "1:363670284184:web:67532b31718d2273ebaded"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
};