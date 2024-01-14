import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { thumbnailSettings } from "./Util/CommonComponets";
import "../Component.css";

const Imageslider = ({ thumbnails }) => {
  const [thumbnail, setThumbnail] = useState(thumbnails[0]);
  
  const mainImage = (selectedImage) => {
    setThumbnail(selectedImage);
  };
  
  return (
    <div className="responsiveImageBox">
      <div className="productDetaileImageBox">
        <TransformWrapper>
          <TransformComponent>
            <div className="productDetaileOuterBox">
            <img src={thumbnail} id="productDetaileMain-Image" />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="productDetaileSlider">
        <Slider {...thumbnailSettings}>
          {thumbnails.map((thumbnailImage,index) => {
            return (
              <div className="thumbnailDiv" key={index}>
                <div className="card" id="productDetaile-Container">
                  <img
                    src={thumbnailImage}
                    alt={"title"}
                    id="productDetaileImage"
                    onClick={(e) => mainImage(thumbnailImage)}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Imageslider;