// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // doc gets the document, whilst getDoc and setDoc gets/sets the data

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: "select_account"}); // This will show the google popup for authentication if the googlProvider is used 

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); // Here by using googlProvider we have assigned it to allow signin up with Google SignIn, otherwise we can also setup to use facebook, twitter etc
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Setup the firestore database
export const db = getFirestore(); // Gets the firestore database and assigns it to db

// Setting up user documents, so that we can later store it in the firestore database
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid); // This doc() method  will get a document reference for the db mentioned, under the users collection with a uid for who is loggined in, if not found google will generate this document reference(Note this will not automatically create it in firestore). We do this by passing in the db to the doc() method, with the second argument being the collection name(here it will be 'users'), and finally, UserID from userAuth which would be our unique id
    console.log(userDocRef);                             // shows the document reference object (note that the user is still not created in the firestore db yet)

    //get the data(userSnapshot) for a particular document. 
    const userSnapshot = await getDoc(userDocRef);       // Gets the document for the provided useDocRef known as the document Snapshot
    console.log(userSnapshot);
    console.log(userSnapshot.exists());                 // the exists() method checks inside the firestore databse if that document snapshot exists or not

    // if the firestore database does not have a snapshotfor this user:    
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;          // Grab the displayName and email from the user who is signed in
        const createAt = new Date();                    // take the date and assigne it to createdAt

        try {
            await setDoc(userDocRef, {displayName, email, createAt});                    // creates a document in our database using the useDocRef (the document reference generated earlier) and add to it displayName, email and createAt)
        } catch(err) {
            console.log('Error creating the user', err.message)                         // logs the error message if the snapshot document was not created.
        }
    }    
    // if user data exists, it will skip the condition above and simply return userDocRef(that already exists)
    return userDocRef;


    //if user data eists the return the userDocRef
}

export default firebaseApp;