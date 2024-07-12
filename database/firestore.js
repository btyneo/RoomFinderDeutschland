// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqS4360D9_gx__lLr537zDqd6RAiLApT4",
  authDomain: "roomlocator-bb890.firebaseapp.com",
  projectId: "roomlocator-bb890",
  storageBucket: "roomlocator-bb890.appspot.com",
  messagingSenderId: "367216172930",
  appId: "1:367216172930:web:f9764187805eee47ba799b",
  measurementId: "G-82TYDH7PJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function addData()