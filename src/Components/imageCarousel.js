import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSearchbyDataList } from "./cartContext";
import { mainCarouselSettings } from "./Util/imageCarouselSettings";

export const mainCarouselStyles = makeStyles({
  card: {
    width: "87%",
    marginLeft: "1.4rem",
    height: "fit-content",
    border: "2px solid #ddd",
    boxShadow: "2px 3px 5px 2px #999",
    "@media (min-width: 600px) and (max-width:900px)": {
      marginLeft: "2.65rem",
      width: "82%",
    },
    "@media (min-width: 300px) and (max-width:500px)": {
      marginLeft: "1.49rem",
      width: "87%",
    },
    "@media (min-width: 500px) and (max-width:600px)": {
      marginLeft: "6.45rem",
      width: "64%",
    },
  },
});

const ImageCarousel = ({ products }) => {
  const classes = mainCarouselStyles();
  const navigate = useNavigate();
  const { searchByDataList } = useSearchbyDataList();
  const slider = useRef(null);

  const handelProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const clearSearch = () => {
    searchByDataList("");
  };
  return (
    <Box className="after-dots" onClick={clearSearch} data-testid="image-carousel">
      <Slider ref={slider} {...mainCarouselSettings}>
        {products?.map((item) => {
          const { title, id, image } = item;
          return (
            <Box  key={id}>
              <Card variant="outlined" className={classes.card} data-testid="clicked"
                  >
                <img
                  src={image}
                  alt={title}
                  className="imageSlider"
                  onClick={(e) => handelProductDetail(id)}
                />
              </Card>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;