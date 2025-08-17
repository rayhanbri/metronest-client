import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase_init';
;


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const provider = new GoogleAuthProvider();

    const googleLogin = () => {
        setLoading(true);
        // Ensure scope and prompt are always refreshed before login
        provider.addScope('email');
        provider.setCustomParameters({ prompt: 'select_account' });
        return signInWithPopup(auth, provider)
    }

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            //console.log('use in auth', currentUser)
            setLoading(false);
        })

        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        createUser,
        signIn,
        user,
        loading,
        logOut,
        googleLogin,
        updateUserProfile
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;