// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMqqEzCWc8vUNSoXre3GGRe3c9-oD_Z68",
  authDomain: "lets-poll-806b1.firebaseapp.com",
  projectId: "lets-poll-806b1",
  storageBucket: "lets-poll-806b1.appspot.com",
  messagingSenderId: "137118585402",
  appId: "1:137118585402:web:ee80baace6bb1488cb9b03",
  measurementId: "G-KEGVZK2C75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);