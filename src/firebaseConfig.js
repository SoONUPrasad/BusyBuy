// Import the functions you need from the SDKs you ne
import { initializeApp } from "firebase/app";

// import firebase from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaZ5z-_Xsfn7MVoIIwYJ5X5O_djRfnLF0",
  authDomain: "e-com-a8c36.firebaseapp.com",
  projectId: "e-com-a8c36",
  storageBucket: "e-com-a8c36.appspot.com",
  messagingSenderId: "551955056774",
  appId: "1:551955056774:web:e29bcb066fb86be0e6e907"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
