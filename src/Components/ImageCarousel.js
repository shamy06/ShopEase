import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { mainCarouselSettings } from "./Util/CommonComponets";
import { productDetail, datalistDispatch, searchDispatch } from "../Redux/Action/ProductAction";
import "../Component.css";

const ImageCarousel = ({products}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const slider = useRef(null);

  const handelProductDetail =(id)=>{
    dispatch(productDetail(id));
    dispatch(searchDispatch(""))
    navigate(`/product/${id}`);
  };

  const clearSearch=()=>{
    dispatch(datalistDispatch(""))
  }

  return (
    <div className="main" onClick={clearSearch} >
      <div className="after-dots">
        <Slider ref={slider} {...mainCarouselSettings}>
          {products
            .map((item) => {
              const { title, id, image } = item;
              return (
                <div className="carosuel" key={id}>
                  <div className="carosuelSpacing">
                    <div className="ui stcakbale card" id="leftSide-image">
                      <div onClick={(e)=>handelProductDetail(id)}>
                        <img src={image} alt={title} className="imageSlider" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;