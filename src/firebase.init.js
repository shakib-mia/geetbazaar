import React from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7THwyIf3w1mXqtKDfwRRzanoMj43uzj4",
  authDomain: "geetbazaar-af40f.firebaseapp.com",
  projectId: "geetbazaar-af40f",
  storageBucket: "geetbazaar-af40f.firebasestorage.app",
  messagingSenderId: "32030604883",
  appId: "1:32030604883:web:72388f5924c19b6bca10a6",
  measurementId: "G-D2G490LDLM",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB8ORtnUmu2cQ0dxHX2Xl8BheNLGclb1Zc",
//   // authDomain: "geetbazaardigital.com",
//   authDomain: "geetbazaar-digital-43161.firebaseapp.com",
//   projectId: "geetbazaar-digital-43161",
//   storageBucket: "geetbazaar-digital-43161.appspot.com",
//   messagingSenderId: "209383096809",
//   appId: "1:209383096809:web:e4f7537b560beb98a80b78",
//   measurementId: "G-42LT5XDG4B",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
