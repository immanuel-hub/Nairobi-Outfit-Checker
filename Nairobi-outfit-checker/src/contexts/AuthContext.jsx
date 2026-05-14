import {createContext, useContext, useEffect, useState} from 'react';
import {onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';
import {auth, googleProvider} from '../firebase';

const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({children}) {
    const[user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
}  
const signInWithGoogle = async () => {
    try { console.log('Attempting to sign in ...');
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Sign in successful:', result.user.email);
        return result
    }
    catch (error) {
        console.error('Google signing in error:', error);
        throw error;
    }
}
 const logOut = async () => {
    try {
        await signOut(auth);
        console.log('User signed out successfully');
    }
    catch (error) {
        console.error(' sign out error:', error);
    }
}
useEffect(() => {
   console.log('Setting up auth listener...');
    const unsubscribe = onAuthStateChanged(auth, (user)) => {
        console.log('Auth state changed:', user ? user.email : 'No user');
        setUser(user);
        setLoading(false);
    };

    return unsubscribe;
}, []);
const value = { user, signInWithGoogle, logOut };
return (
    <AuthContext.Provider value={value}>
        {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
);

