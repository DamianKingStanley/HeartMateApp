// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcJZlDgXKpMrNVunyRgBRl3Y0-r-8TU9w",
    authDomain: "heartmate-9fe7e.firebaseapp.com",
    projectId: "heartmate-9fe7e",
    storageBucket: "heartmate-9fe7e.appspot.com",
    messagingSenderId: "493865481156",
    appId: "1:493865481156:web:4690bfdd7e41fb499caa91",
    measurementId: "G-4KQW8MXFSY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);