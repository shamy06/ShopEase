import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import { addProductToCart } from "../Redux/Action/ProductAction";
import Toast from "./Toast";
import "../Component.css";

const AddtoCart = ({ id,title,carts }) => {
  const dispatch = useDispatch();

  const styles = theme => ({
    cart: {
      padding: "6px 16px",
      borderRadius: 0,
      border: "2px solid #000",
      backgroundColor: "darkorange",
      color: "black",
      transition: "background 1s, color 1s",
      "&:hover": {
        backgroundColor: "blue",
        color: "black"
      }
    }
  });

  const handleClick = (id) => {
    if (carts.some((item) => item.id === id)) {
      Toast(`${title} is already added !`, "info");
    } else {
      Toast(`${title} is added to Cart Successfully!`, "success");
      dispatch(addProductToCart({ id }));
    }
    };

  return (
    <div >
        <Button variant="outlined" className="Button-Cart" onClick={() => handleClick(id)}>
          <span >Add to cart</span>
        </Button>
      </div>
  );
};

export default AddtoCart;