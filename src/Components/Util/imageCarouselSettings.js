import { Box } from "@mui/material";
import { MdArrowForwardIos,MdArrowBackIos } from "react-icons/md";

export const PreviousBtn = (props) => {
    const { className, onClick } = props;
    
    return (
      <>
        <Box className={className} onClick={onClick} data-testid="slick-prev">
          <MdArrowBackIos style={{ color: "black", fontSize: "35px" }} />
        </Box>
      </>
    );
  };
  
  export const NextBtn = (props) => {
    const { className, onClick } = props;
    
    return (
      <>
        <Box className={className} onClick={onClick} data-testid="slick-next">
          <MdArrowForwardIos style={{ color: "black", fontSize: "35px" }} />
        </Box>
      </>
    );
  };
  
  export const mainCarouselSettings = {
    arrows: true,
    infinite: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 3500,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 821,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 666,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };