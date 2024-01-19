import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { thumbnailSettings } from "./Util/CommonCarouselComponets";

const useImageSliderStyle=makeStyles({
  box:{
    display: 'flex', 
    justifyContent: 'center'
  },
  box2:{
    marginTop:'30px',
    '@media (min-width: 0px) and (max-width:600px)': {
      marginTop: "24px",
    },
  },
  nestedbox:{
    paddingLeft: '3px',
    '@media (min-width: 0px) and (max-width:600px)': {
      marginLeft: "12px",
    },
  },
  card:{
    width: '80%', 
    height: '73px',
    margin: '5px',
    border: '3px solid #ddd' 
  }
})

const Imageslider = ({ thumbnails }) => {
  const [thumbnail, setThumbnail] = useState(thumbnails[0]);
  const classes = useImageSliderStyle();

  const mainImage = (selectedImage) => {
    setThumbnail(selectedImage);
  };

  return (
    <Box>
      <Box className={classes.box}>
        <TransformWrapper>
          <TransformComponent>
            <Box className="productDetaileOuterBox">
              <img src={thumbnail} id="productDetaileMain-Image" />
            </Box>
          </TransformComponent>
        </TransformWrapper>
      </Box>
      <Box className={classes.box2}>
        <Slider {...thumbnailSettings}>
          {thumbnails.map((thumbnailImage, index) => {
            return (
              <Box className={classes.nestedbox} key={index}>
                <Card className={classes.card}>
                  <img
                    src={thumbnailImage}
                    alt={"title"}
                    id="productDetaileImage"
                    onClick={(e) => mainImage(thumbnailImage)}
                  />
                </Card>
              </Box>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
};

export default Imageslider;