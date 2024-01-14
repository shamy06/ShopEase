import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { datalistDispatch, searchDispatch } from "../Redux/Action/ProductAction";
import "../Component.css";

const CartNavbar = ({cartsItemCount}) => {
  const dispatch = useDispatch();
  
  const clearSearch = () => {
    dispatch(datalistDispatch(""));
    dispatch(searchDispatch(""));
  };

  return (
    <>
      <div className="cart">
        <Link to="/cart">
          <i
            className="fa fa-shopping-cart"
            onClick={clearSearch}
          />
        </Link>
        <span id="wishlist-count">
          {cartsItemCount > 0 ? cartsItemCount : false}
        </span>
      </div>
    </>
  );
};

export default CartNavbar;