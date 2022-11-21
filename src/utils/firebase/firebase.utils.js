// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, DocumentSnapshot } from 'firebase/firestore'; // doc gets the document, whilst getDoc and setDoc gets/sets the data

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

// Setup the firestore database
export const db = getFirestore(); // Gets the firestore database and assigns it to db

// adding new collection and the documents to the database- categories of products and the products from our SHOP_DATA js objects. CollectionKey will be for the categories. objectsToAdd will be the SHOP_DATA js pobject writeBatch is used when you have more than one thing being updated(a transaction - in thins case a category and its objects(items within each collection))
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);                             // go to database with the collectionKey(category) and pass this collections to
    const batch = writeBatch(db);                                                   // since we will write multiple documents into each collection(multiple producst into each category), we have to use the writeBatch method
                                                                                    //writeBatch() allows to attached a bunch of writes, deletes, sets etc to the batch, and once all of them are completed then we can commit it
    // for each of the objects we will batch set them
    objectsToAdd.forEach((object) => {                                              // each object has has a title and the items array(see SHOP_DATA) 
        const docRef = doc(collectionRef, object.title.toLowerCase());              // we get the docRef with the method doc() and passing it collectionRef and the objects.title
        batch.set(docRef, object);                                                  // sets for each object(category), a docRef for each object
    });

    await batch.commit();                                                           // awaits for the batch to be ready to be committed.
 //   console.log('done');                                                            
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');                             // get collection reference by passing the db and collection key(categories) to the collection method.
    const q = query(collectionRef);                                                // generate a query generates an object: collectionRef is passed on to the query to provide a snapshot

    const querySnapshot = await getDocs(q);                                         // getDocs allows to use the object from query(q) to then grab a snapshot documents
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
}

// Setting up user documents, so that we can later store it in the firestore database
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid); // This doc() method  will get a document reference for the db mentioned, under the users collection with a uid for who is loggined in, if not found google will generate this document reference(Note this will not automatically create it in firestore). We do this by passing in the db to the doc() method, with the second argument being the collection name(here it will be 'users'), and finally, UserID from userAuth which would be our unique id
 //   console.log(userDocRef);                             // shows the document reference object (note that the user is still not created in the firestore db yet)

    //get the data(userSnapshot) for a particular document. 
    const userSnapshot = await getDoc(userDocRef);       // Gets the document for the provided useDocRef known as the document Snapshot
//    console.log(userSnapshot);
 //   console.log(userSnapshot.exists());                 // the exists() method checks inside the firestore databse if that document snapshot exists or not

    // if the firestore database does not have a snapshotfor this user:    
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;          // Grab the displayName and email from the user who is signed in
        const createdAt = new Date();                    // take the date and assigne it to createdAt

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});                    // creates a document in our database using the useDocRef (the document reference generated earlier) and add to it displayName, email and createAt)
        } catch(err) {
            console.log('Error creating the user', err.message)                         // logs the error message if the snapshot document was not created.
        }
    }    
    // if user data exists, it will skip the condition above and simply return userDocRef(that already exists)
    return userSnapshot;


    //if user data eists the return the userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);                             //  Context Step 7 - 

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    }) ;
};

export default firebaseApp;