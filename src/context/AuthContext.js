'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

    // ✅ SIGNUP FUNCTION
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    
      // ✅ OPTIONAL: Add login/logout too if needed
      const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
      };
    
      const logout = () => {
        return signOut(auth);
      };
    

  return (
    <AuthContext.Provider value={{ user,signUp,login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
