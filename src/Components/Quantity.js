import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../Component.css";

const Quantity = ({ product}) => {
  const [quantity, setQuantity] = useState(1);
  const { qnty } = product;
  
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
    <div className="quantity">
      Quantity
      <Button
        id={qnty>1 ? "quantity-Button":"nonActive"}
        onClick={() => decrease(product)}
      >
        -
      </Button>
     <span id="quantity-Button">{qnty}</span>
      <Button
        id="quantity-Button"
        onClick={() => increase(product)}

      >
        +
      </Button>      
    </div>
  );
};

export default Quantity;