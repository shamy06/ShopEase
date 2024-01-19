import React, { memo } from "react";
import { Button, styled } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCart, useSnackBar } from "./cartContext";

const AddtoCart = ({ id, title }) => {
  const { addItem, cartItems } = useCart();
  const { addSnackbarItem } = useSnackBar();

  const MyButton = styled(Button)({
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    fontWeight: 'bolder',
    fontFamily: ['Arial', 'Helvetica', 'sans-serif'],
    '@media (min-width: 300px) and (max-width:900px)': {
      fontSize: '1rem'
    },
  });

  const handleClick = (id) => {
    if (cartItems.some((item) => item.id === id)) {
        addSnackbarItem(true,`${title} is already added`,"info");
    } else {
      addSnackbarItem(true,`${title} is added to cart Successfully`,"success");
      addItem({
        id: id
      });
    }
  };

  return (
    <>
      <MyButton onClick={() => handleClick(id)} startIcon={<ShoppingBasketIcon />}>
        Add Cart
      </MyButton>
    </>
  );
};

export default memo(AddtoCart);