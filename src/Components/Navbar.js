import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { datalistDispatch } from "../Redux/Action/ProductAction";
import { BsShopWindow } from "react-icons/bs";
import WishListNavbar from "./WishlistNavbar";
import CartNavbar from "./CartNavbar";
import NavBarSearchDropDrown from "./NavbarDropDown";
import Logout from "./Logout";
import "../Component.css";

const NavBar = ({ cartsItemCount, wishListItemCount, dataList }) => {
  const dispatch = useDispatch();
  const userWishlist = JSON.parse(localStorage.getItem("userData") || "[]");
  const loginUsername = localStorage.getItem("signUp");
  console.log(userWishlist)
  const {wishListId} = userWishlist.find((productItem) => {
    if (productItem.userName === loginUsername) {
      return productItem.wishListId;
    }
  })||[];
  wishListItemCount=wishListId?.length||0;
  
  const clearSearch = () => {
    dispatch(datalistDispatch(""));
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container" onClick={clearSearch}>
          <div className="navbar-brand">
            <NavLink to="/" className="nav-logo" onClick={clearSearch}>
              Shopping Cart
            </NavLink>
            <NavLink to="/">
              <BsShopWindow id="cart-logo" />
            </NavLink>
          </div>
          <NavBarSearchDropDrown dataList={dataList} />
          <WishListNavbar wishListItemCount={wishListItemCount} />
          <CartNavbar cartsItemCount={cartsItemCount} />
          <div className="login-Button">
            <Logout loginUsername={loginUsername} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;