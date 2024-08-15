// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL17w6AFfkGUyWG55FLQSbGu-4X2ARGo8",
  authDomain: "memory-base-97d4d.firebaseapp.com",
  projectId: "memory-base-97d4d",
  storageBucket: "memory-base-97d4d.appspot.com",
  messagingSenderId: "184654052937",
  appId: "1:184654052937:web:f0c350947e5c7dd6f68998",
  measurementId: "G-4QD46ZYP13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);