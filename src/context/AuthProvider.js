import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';

const AUTH_CONTEXT = createContext();
export const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) =>{
        return updateProfile(user, userInfo);
    }

    // const provider = new GoogleAuthProvider();

    const googleSignIn = (googleProvider)=>{
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const value = {
        createUser,
        signIn,
        updateUser,
        googleSignIn,
        logOut,
        user,
        loading
    }







    return (
        <AUTH_CONTEXT.Provider value={value}>{children}</AUTH_CONTEXT.Provider>
    );
};

export const useFirebaseAuth = () => {
    const context = useContext(AUTH_CONTEXT);
    return context;
}

export default AuthProvider;