import React from "react";
import { useDispatch } from "react-redux";
import { AiFillDelete as Delete} from "react-icons/ai";
import { deleteCartProduct} from "../Redux/Action/ProductAction";
import Toast from "./Toast";
import "../Component.css";

const RemoveProductFromCart = ({ id, title }) => {
  const dispatch = useDispatch();
  
  return (
    <>
      <Delete
        fontSize="32px"
        id="deleteIcon"
        onClick={() => (
          Toast(`${title} is removed from cart successfully`, "success"),
          dispatch(deleteCartProduct(id))
        )}
      />
    </>
  );
};

export default RemoveProductFromCart;