import React from "react";
import { GiSplitCross } from "react-icons/gi";
import { BsBag, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

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
        {user && (
          <Link to="/carts" className="text-2xl mr-6">
            <BsBag />
          </Link>
        )}
        {/* {user && user.admin && (
          <Link>
            <BsPencil />
          </Link>
        )} */}
        {user && <UserProfile user={user} />}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </nav>
    </header>
  );
}
