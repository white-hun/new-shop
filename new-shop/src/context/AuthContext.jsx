import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange, setUserInfo } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      setUserInfo(user);
    });
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
