// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_j4wtUIzu12acTlAwiNePVDQ6NUjdeD8",
  authDomain: "passparrot.firebaseapp.com",
  projectId: "passparrot",
  storageBucket: "passparrot.appspot.com",
  messagingSenderId: "407798455124",
  appId: "1:407798455124:web:bccb01427a9dc7fc1186c1",
  measurementId: "G-D5WQJGNBGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)
export {auth,firestore}