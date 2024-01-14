import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import Toast from "./Toast";

const Logout = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("signUp");   

  const logout = () => {
    localStorage.removeItem("signUp");  
    navigate("/")
    navigate(0);
    Toast("Successfully LOGOUT!!", "success");
  };

  return localStorage.getItem("signUp") ? (
    <div className="username-context">
      <span >Welcome {username}</span>
      <AiOutlineLogout className="user-icon" onClick={logout} />
    </div>
  ) : (<>
    <div className="loginNavbar-Link">
      <NavLink to="/login">Login</NavLink>
      <span>/</span>
      <NavLink to="/registration">Register</NavLink>
      </div>
    <div className="loginLogo">
    <NavLink to="/login"><BiLogIn/></NavLink>
    </div>
    </>
  );
};

export default Logout;