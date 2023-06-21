import { createContext, useContext, useEffect, useState } from "react";
import { db, login, logout, onUserStateChange } from "../api/firebase";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const setUserInfo = async () => {
    user.uid === process.env.REACT_APP_ADMIN_UID
      ? await setDoc(doc(db, "users", "admin", `${user.uid}`, "adminInfo"), {
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        })
      : await setDoc(doc(db, "users", "user", `${user.uid}`, "userInfo"), {
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
  };

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
    setUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
