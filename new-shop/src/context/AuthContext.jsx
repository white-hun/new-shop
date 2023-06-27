import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      console.log("4", user);
    });
    return console.log("5", user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        uid: user && user.uid,
        // name: user && user.displayName,
        // email: user && user.email,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
