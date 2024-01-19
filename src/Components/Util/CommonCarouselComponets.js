import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Card,
  Divider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { numberFormat } from "../PriceFormat";
import "../../Component.css";

export const settings = {
  arrows: true,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 2,
  lazyLoad: true,
  autoplay: false,
  dots: false,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 830,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 670,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 460,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 361,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
  ],
};

export const thumbnailSettings = {
  arrows: true,
  infinite: true,
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  lazyLoad: false,
  autoplay: false,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 959,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 361,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
  ],
};

const useCarouselStyles = makeStyles({
  card: {
    width: "85%",
    marginLeft: "8px",
    marginBottom: "16px",
    border: "2px solid #ddd",
    cursor: "pointer",
    boxShadow: "2px 2px 5px 3px #999",
    height: "max-content",
    "@media (min-width: 0px) and (max-width:600px)": {
      width: "93%",
      marginLeft: "4px",
    },
    "@media (min-width: 600px) and (max-width:900px)": {
      width: "93%",
    },
  },
  subTitle: {
    fontSize: "16px",
    marginLeft: "8px !important",
    marginBottom: "16px !important",
  },
  subTitle2: {
    fontSize: "16px",
    ml: 0,
    mb: "16px",
  },
  card2: {
    border: "2px solid #ddd",
    cursor: "pointer",
    boxShadow: "2px 2px 5px 3px #999",
    marginBottom: "8px",
  },
  imageBox: {
    height: "162px",
    width: "100%",
    border: "white 2px solid",
  },
  content: {
    marginLeft: "1rem",
    fontSize: "16px",
    width: "fitContent",
  },
  box: {
    marginLeft: "1rem",
    marginRight: "1.1rem",
    width: "14.5%",
  },
  box2: {
    marginLeft: "1rem",
    marginRight: "1.1rem",
    width: "14.5%",
    "@media (min-width: 0px) and (max-width:600px)": {
      width: "93%",
    },
    "@media (min-width: 600px) and (max-width:900px)": {
      width: "29.5%",
    },
    "@media (min-width: 900px) and (max-width:1200px)": {
      width: "22%",
    },
  },
});

export const CommonCarouselProducts = ({ products }) => {
  const navigate = useNavigate();
  const classes = useCarouselStyles();

  const handelProductDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Slider className="smilarSlick" {...settings} >
      {products.map((item) => {
        const { title, id, image, price } = item;
        return (
          <Box key={id} sx={{ ml: { sm: 0.2, lg: 0, xs: 0, md: 0 } }}>
            <Card
              className={classes.card}
              onClick={(e) => handelProductDetails(id)}
            >
              <Box data-testid="similar-products3">
                <img src={image} alt={title} className="similarProductImages" />
              </Box>
            </Card>
            <Typography variant="subtitle" className={classes.subTitle}>
              {title}
            </Typography>
            <Divider sx={{ border: "none" }} />
            <Typography variant="subtitle" className={classes.subTitle}>
              {numberFormat(price)}
            </Typography>
          </Box>
        );
      })}
    </Slider>
  );
};

export const RecentlyViewedProductsCarousel = ({ products }) => {
  const navigate = useNavigate();
  const classes = useCarouselStyles();
  const recentProductsLength = products.length;

  const handelProductDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const setting = {
    arrows: true,
    infinite: true,
    slidesToShow: recentProductsLength,
    slidesToScroll: 2,
    lazyLoad: false,
    autoplay: false,
    dots: false,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };
  return (
    <Box>
      {recentProductsLength <= 2 && window.innerWidth >= 365 ? (
        <Box sx={{ display: "flex" }}>
          {products.map((item) => {
            const { title, id, image, price } = item;
            return (
              <Box className={classes.box2} key={id}>
                <Box onClick={(e) => handelProductDetails(id)} data-testid="handleProduct">
                  <Card className={classes.card}>
                    <img src={image} alt={title} className="recentImages" />
                  </Card>
                </Box>
                <Typography variant="subtitle" className={classes.subTitle2} data-Testid="Recentproducts2">
                  {title}
                </Typography>
                <Divider sx={{ border: "none" }} />
                <Typography variant="subtitle" className={classes.subTitle2}>
                  {numberFormat(price)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      ) : recentProductsLength === 3 && window.innerWidth >= 830 ? (
        <Box sx={{ display: "flex" }}>
          {products.map((item) => {
            const { title, id, image, price } = item;
            return (
              <Box className={classes.box2} key={id}>
                <Box onClick={(e) => handelProductDetails(id)} data-testid="handleProduct">
                  <Card className={classes.card2} id="box">
                    <img src={image} alt={title} className="recentImages" />
                  </Card>
                </Box>
                <Typography variant="subtitle" className={classes.subTitle2} data-Testid="Recentproducts3">
                  {title}
                </Typography>
                <Divider sx={{ border: "none" }} />
                <Typography variant="subtitle" className={classes.subTitle2}>
                  {numberFormat(price)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      ) : (recentProductsLength === 4 || recentProductsLength === 5) &&
        window.innerWidth >= 951 ? (
        <Box sx={{ display: "flex" }}>
          {products.map((item) => {
            const { title, id, image, price } = item;
            return (
              <Box className={classes.box} key={id}>
                <Box onClick={(e) => handelProductDetails(id)} data-testid="handleProduct">
                  <Card className={classes.card2}>
                    <img src={image} alt={title} className="recentImages" />
                  </Card>
                </Box>
                <Typography variant="subtitle" className={classes.subTitle2}data-Testid="Recentproducts4">
                  {title}
                </Typography>
                <Divider sx={{ border: "none" }} />
                <Typography variant="subtitle" className={classes.subTitle2}>
                  {numberFormat(price)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Slider className="smilarSlick" {...setting}>
          {products.map((item) => {
            const { title, id, image, price } = item;
            return (
              <Box key={id}>
                <Box onClick={(e) => handelProductDetails(id)} data-testid="handleProduct">
                  <Card className={classes.card} data-Testid="Recentproducts6">
                    <Box className={classes.imageBox}>
                      <img
                        src={image}
                        alt={title}
                        className="similarProductImages"
                      />
                    </Box>
                  </Card>
                </Box>
                <Typography className={classes.content}>{title}</Typography>
                <Typography className={classes.content}>
                  {numberFormat(price)}
                </Typography>
              </Box>
            );
          })}
        </Slider>
      )}
    </Box>
  );
};
