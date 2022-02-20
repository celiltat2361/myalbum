import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { HashLoader } from "react-spinners";

const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const contextValues = {
    currentUser,
    loading,
    login,
    logout,
    signup,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {loading && (
        <div id="spinner">
          <HashLoader color={"#888"} size={50} />
        </div>
      )}
      {!loading && children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserContextProvider as default };
