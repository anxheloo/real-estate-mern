// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-mern-c824d.firebaseapp.com",
  projectId: "real-estate-mern-c824d",
  storageBucket: "real-estate-mern-c824d.appspot.com",
  messagingSenderId: "216773550452",
  appId: "1:216773550452:web:e93bcc003a74ba3414cc21",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
