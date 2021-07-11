import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBjAA3MMeYd7sRlpm05iYPyJHtYxCUirX4",
  authDomain: "egkaas-zuipen.firebaseapp.com",
  projectId: "egkaas-zuipen",
  storageBucket: "egkaas-zuipen.appspot.com",
  messagingSenderId: "375488233242",
  appId: "1:375488233242:web:a4bfd85ed5d72dcfe676a3",
  measurementId: "G-FKCC8YVPS2",
});

export const auth = app.auth();
export default app;
