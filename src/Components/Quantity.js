import React, { memo, useState } from "react";
import { Typography} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { makeStyles } from "@mui/styles";
import "../Component.css";

export const useQuantityStyle=makeStyles({
  typography:{
    textAlign:"center",
    // display:"inline-flex"
  },
  minusIcon:{
    cursor:"pointer",
    marginLeft:'8px',
    marginRight:'4px',
    marginTop:'2px',
    backgroundColor:'lightblue',
    fontSize:'20px'
  },
  plusIcon:{
    cursor:"pointer",
    marginRight:'8px',
    marginTop:'2px',
    marginLeft:'8px',
    backgroundColor:'lightblue',
    fontSize:'20px'
  }
})

const Quantity = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { qnty } = product;
  const classes = useQuantityStyle();
  
  const increase = (product) => {
      product.qnty += 1;
      setQuantity(quantity + 1);
  };

  const decrease = (product) => {
    if (quantity > 1 || product.qnty > 1) {
      product.qnty -= 1;
      setQuantity(quantity - 1);
    }
  };

  return (
    <Typography className={classes.typography} variant="h6">
      Quantity
      <RemoveOutlinedIcon className={classes.minusIcon}
        onClick={() => decrease(product)}
      />
     {qnty}
      <AddOutlined className={classes.plusIcon}
        onClick={() => increase(product)}
      />
    </Typography>
  );
};

export default memo(Quantity);