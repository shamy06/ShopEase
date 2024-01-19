import React, { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CommonCarouselProducts,
  RecentlyViewedProductsCarousel,
} from "./Util/CommonCarouselComponets";

const useRecentlyViewd = makeStyles({
  box:{
    marginTop:'16px',
    marginBottom:'16px'
  },
  heading:{
    fontWeight: "bold !important", 
    marginLeft: '8px !important'
  }
})

const RecentlyViewedProducts = ({ recentViewedProduct }) => {
  const classes = useRecentlyViewd();
  
  const queryClient = useQueryClient();
  const {data} = queryClient.getQueryData('elements');
  const recentProducts = useMemo(()=>{ return data.filter((item) =>
    recentViewedProduct.find((productId) => item.id === (productId)))
  },[recentViewedProduct]
  );
  
  const recentProductsLength = recentViewedProduct.length;

  const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth]);
    useEffect(() => {
      const handelResize = () => {
        setSize([window.innerWidth]);
      };
      window.addEventListener("resize", handelResize);
    }, []);
    return size;
  };

  const [width] = useWindowSize();

  return (
    <>
      <Box className={classes.box}>
        <Typography variant="h5" className={classes.heading} data-Testid="Recently-products2">
          Recently Viewed Products
        </Typography>
      </Box>
      {recentProductsLength >= 6 ? (
        <CommonCarouselProducts products={recentProducts} />
      ) : width <= 830 && width > 670 && recentProductsLength >= 3 ? (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      ) : width <= 830 && width > 670 && recentProductsLength <= 2 ? (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      ) : width <= 950 && width > 830 && recentProductsLength === 3 ? (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      ) : recentProductsLength === 4 || recentProductsLength === 5 ? (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      ) : (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      )}
    </>
  );
};

export default RecentlyViewedProducts;