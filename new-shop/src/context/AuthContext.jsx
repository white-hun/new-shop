import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      setUserId(user.uid);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
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
