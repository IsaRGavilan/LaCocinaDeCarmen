// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZNFn3ZcpOkupdBmIBHgjCyPgbpjlbQqU",
  authDomain: "lacocinadecarmen-irg.firebaseapp.com",
  projectId: "lacocinadecarmen-irg",
  storageBucket: "lacocinadecarmen-irg.appspot.com",
  messagingSenderId: "123181425496",
  appId: "1:123181425496:web:c81934b654f18d6e113b2d",
  measurementId: "G-8VCG2NBN41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export default{app, firestore, analytics};