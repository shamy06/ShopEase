import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addProductToWishList,
  deleteWishListProduct,
} from "../Redux/Action/ProductAction";
import Toast from "./Toast";
import "../Component.css";

const AddtoWishList = ({ id, title, wishList }) => {
  const dispatch = useDispatch();
  const userWishlist = JSON.parse(localStorage.getItem("userData") || "[]");
  const loginUsername = localStorage.getItem("signUp");

  const { wishListId } =
    userWishlist.find((productItem) => {
      if (productItem.userName === loginUsername) {
        return productItem.wishListId;
      }
    }) || [];
  wishList = wishListId || [];

  const navigate = useNavigate();

  const handleClick = (id) => {
    if (loginUsername) {
      if (wishList.some((item) => item.id === id)) {
        Toast(`${title} is removed Successfully`, "success");
        dispatch(deleteWishListProduct(id));
      } else {
        Toast(`${title} is added to wishlist Successfully`, "success");
        dispatch(addProductToWishList({ id }));
      }
    } else {
      navigate("/login");
      Toast("Login is Required", "info");
    }
  };

  return (
    <div>
      <span>
        <i
          className={
            wishList.some((item) => item.id === id)
              ? "fa fa-heart icon-active"
              : "fa fa-heart wishlist"
          }
          id="wishList-componentIcon"
          onClick={() => handleClick(id)}
        ></i>
      </span>
    </div>
  );
};

export default AddtoWishList;