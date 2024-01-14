import React from "react";
import { useDispatch } from "react-redux";
import { AiFillDelete as Delete } from "react-icons/ai";
import { deleteWishListProduct } from "../Redux/Action/ProductAction";
import Toast from "./Toast";
import "../Component.css";

const RemoveProduct = ({ id , title}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Delete
        fontSize="32px"
        id="deleteIcon"
        onClick={() => (
          Toast(`${title} is removed from wishlist successfully`, "success"),
          dispatch(deleteWishListProduct(id))
        )}
      />
    </>
  );
};

export default RemoveProduct;