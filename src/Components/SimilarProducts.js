import React,{ memo } from "react";
import { useQueryClient } from "react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CommonCarouselProducts } from "./Util/CommonCarouselComponets";

const usesimilarProductStyle = makeStyles({
  box: {
    marginTop: '8px !important'
  },
  heading: {
    fontWeight: "bold !important",
    marginLeft: '16px !important',
    marginBottom: '16px !important'
  },
  box2: {
    '@media (min-width: 0px) and (max-width:600px)': {
      marginLeft: '4px'
    },
  }
})

const SimilarProducts = ({ category }) => {
  const classes = usesimilarProductStyle();
  const queryClient = useQueryClient();
  
  const { data } = queryClient.getQueryData('elements');
  const categories = data.filter((item) =>
    item.category.toLowerCase().includes(category.toLowerCase()));

  return (
    <Box className={classes.box}>
      <Typography variant="h5" className={classes.heading} data-Testid="similar-products2">
        Similar Products
      </Typography>
      <Box className={classes.box2}>
        <CommonCarouselProducts products={categories} />
      </Box>
    </Box>
  );
};

export default SimilarProducts;