import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// @ts-ignore
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// @ts-ignore
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // @ts-ignore
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
