import { createContext, useState, useEffect } from "react";  

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// Context step 1 - Storage - the context object is where the actual value reside for access to component
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// Context step 2 -  provider is the actual component. Provider is used to wrap components which allows any of the child components to have access to the values inside the useState. It is used as follows <UserContext.Provider value={value}> <app /> </UserContext.Provider>   This gives the <app /> component access to the value from the UserContext's state, where <App /> is the children of the UserProvider.
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);                                   // sets the values for currentUser to null, then we pass these values to an object called value, which is then passed to the UserContext.Provider as value
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
       const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocumentFromAuth(user);                           // pass in the user to the createUserDocumentFromAuth method So that the user is used as userAuth in this method
        }
        setCurrentUser(user);
       })

       return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}