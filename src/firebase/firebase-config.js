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

const firebaseConfigTesting = {
  apiKey: "AIzaSyBGoP1c-Y_v_sGNwzUDjVHvNuSNSgJLmaE",
  authDomain: "devteam-26fb0.firebaseapp.com",
  databaseURL: "https://devteam-26fb0.firebaseio.com",
  projectId: "devteam-26fb0",
  storageBucket: "devteam-26fb0.appspot.com",
  messagingSenderId: "1071658539300",
  appId: "1:1071658539300:web:bfce5456c44d7f6d4afbb1"
};

if(process.env.NODE_ENV === 'test'){
  firebase.initializeApp(firebaseConfigTesting);
}else{
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
};