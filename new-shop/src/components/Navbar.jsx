import React from "react";
import { GiSplitCross } from "react-icons/gi";
import { BsBag, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import { setUserInfo } from "../api/firebase";

export default function Navbar() {
  const { user, uid, login, logout } = useAuthContext();

  const handleLogin = async () => {
    login().then(() => setUserInfo(user, uid));
  };

  return (
    <header className="flex justify-between">
      <Link to="/" className="flex items-center text-4xl">
        <GiSplitCross className="mr-1" />
        <p>POHS</p>
      </Link>
      <nav className="flex items-center">
        <Link to="/products" className="text-2xl mr-5">
          PRODUCT
        </Link>
        {user && user.uid !== process.env.REACT_APP_ADMIN_UID && (
          <Link to="/carts" className="text-2xl mr-6">
            <BsBag />
          </Link>
        )}
        {user && user.uid === process.env.REACT_APP_ADMIN_UID && (
          <Link to="/product/new" className="text-2xl mr-6">
            <BsPencil />
          </Link>
        )}
        {user && <UserProfile user={user} />}
        {!user && <Button text={"Login"} onClick={handleLogin} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </nav>
    </header>
  );
}
