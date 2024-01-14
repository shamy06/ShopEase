import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  datalistDispatch,
  searchDispatch,
} from "../Redux/Action/ProductAction";
import Toast from "./Toast";
import { FaHeart } from "react-icons/fa";
import "../Component.css";

const WishListNavbar = ({ wishListItemCount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("signUp");

  const clearSearch = () => {
    if (loggedIn) {
      navigate("/wishlist");
    } else {
      navigate("/login");
      Toast("Login is Required", "info");
    }
    dispatch(datalistDispatch(""));
    dispatch(searchDispatch(""));
  };

  return (
    <>
      <div className="wish-list">
            <FaHeart className="heart" onClick={clearSearch}/>
        <span id="wishlist-count">
          {wishListItemCount > 0 ? wishListItemCount : false}
        </span>
      </div>
    </>
  );
};

export default WishListNavbar;