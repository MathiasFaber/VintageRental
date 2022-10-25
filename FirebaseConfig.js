import firebase from 'firebase/compat'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAFZPd_IS2hMcwhwjHBr1ENANA9Z4GXInA",
    authDomain: "fir-db-a0f52.firebaseapp.com",
    projectId: "fir-db-a0f52",
    storageBucket: "fir-db-a0f52.appspot.com",
    messagingSenderId: "564638001504",
    appId: "1:564638001504:web:b96751196fd9ba9b695605",
    measurementId: "G-EQDNHME0ZG"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);
const auth = firebase.auth();

export {app, firebase, auth} 