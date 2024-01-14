import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { productDetail, datalistDispatch, searchDispatch } from "../Redux/Action/ProductAction";
import { numberFormat } from "./PriceFormat";
import "../Component.css";

const Description = ({ id, image, title, rating, price, category }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const clearSearch = () => {
    dispatch(datalistDispatch(""));
  };
  
  const handelProductDetail=()=>{
    dispatch(productDetail(id));
    dispatch(searchDispatch(""))
    navigate(`/product/${id}`);
  }

  return (
    <div>
      <div onClick={handelProductDetail}>
        <img
          src={image}
          alt={title}
          id="description-Image"          
          onClick={clearSearch}
        />
        </div>
      <div className="product-info">
        {title}
        <ReactStars size={25} value={rating} isHalf={true}  id="reactStars"/>
        <div>{numberFormat(price)}</div>
        {category}
      </div>
    </div>
  );
};

export default Description;