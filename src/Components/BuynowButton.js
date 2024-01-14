import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { buynowProduct, searchDispatch } from "../Redux/Action/ProductAction";
import "../Component.css";

const BuynowButton = ({ id }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const handleClick = (id) => {
    const loggedIn=localStorage.getItem("signUp")
    if(loggedIn){
      dispatch(buynowProduct({id}))      
      dispatch(searchDispatch(""))
      navigate('/buynow')
  }
  else{
    navigate('/login')
  }
  };  
  const styles = theme => ({
    cart: {
        padding: "6px 16px",
        borderRadius: 0,
        border: "2px solid #000",
        backgroundColor: "white",
        color: "black",
        transition: "background 1s, color 1s",
        "&:hover": {
        backgroundColor: "#000",
        color: "#fff"
        }
    }
});

  return (
    <div >
       <Button className="BuynowButton-ProductDetails" onClick={() => handleClick(id)}>Buy Now 
        </Button>
      </div>
  );
};  

export default BuynowButton;