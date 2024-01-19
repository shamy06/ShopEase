import React, { memo } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useSnackBar } from "./cartContext";
import "../Component.css";

const RemoveProductFromCart = ({ id, title }) => {  
  const { removeItem } = useCart();  
  const { addSnackbarItem } = useSnackBar();
  
  const removeCartProduct=(id)=>{
    removeItem({ id: id });
    addSnackbarItem(true,`${title}  is removed Successfully`,"success");
  }
  
  return (
    <>
      <DeleteIcon
        fontSize="large"
        onClick={() =>  removeCartProduct(id)}
      />
    </>
  );
};

export default memo(RemoveProductFromCart);