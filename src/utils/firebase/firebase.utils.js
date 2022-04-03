// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1EoD86v5Zw1Qhnas2TzvTuFhtsGW9jhI",
  authDomain: "new-royalty-clothing-db-da5d5.firebaseapp.com",
  projectId: "new-royalty-clothing-db-da5d5",
  storageBucket: "new-royalty-clothing-db-da5d5.appspot.com",
  messagingSenderId: "36211565749",
  appId: "1:36211565749:web:5a294775ee9f144652cafc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Setup for Google Authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"}); // This will show the google popup for authentication if the provider is used 

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider) // Here by using provider we have assigned it to allow signin up with Google SignIn, otherwise we can also setup to use facebook, twitter etc

export default firebaseApp;