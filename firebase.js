// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from 'firebase/analytics';
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzz27WEF8JltwNIvotoRvzskZ1PRjUKwk",
  authDomain: "flashcards-6e142.firebaseapp.com",
  projectId: "flashcards-6e142",
  storageBucket: "flashcards-6e142.appspot.com",
  messagingSenderId: "2936338980",
  appId: "1:2936338980:web:24980ec57291b4c74736b1",
  measurementId: "G-PF9K116WDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.log('Analytics not supported:', err);
  });
}

const db = getFirestore(app)

export {db}