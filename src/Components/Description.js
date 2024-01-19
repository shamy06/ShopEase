import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { numberFormat } from "./PriceFormat";
import RemoveProduct from "./RemoveProduct";
import { useSearchProducts, useSearchbyDataList } from "./cartContext";
import "../Component.css";

const useDescriptionStyles = makeStyles({
  description: {
    boxShadow: "none !important",
  },
  cardContent:{    
    paddingBottom: "0 !important",
  },
  descriptonTypography: {
    textAlign: "center",
  },
})

const Description = ({ id, image, title, rating, price, category }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const pathArray = pathname.split("/");
  const [value, setValue] = useState(rating);
  const classes = useDescriptionStyles();
  const { searchByDataList }= useSearchbyDataList();
  const { searchFilter }= useSearchProducts();

  const handelProductDetail = () => {
    searchFilter("");   
    searchByDataList("");
    navigate(`/product/${id}`);
  }

  return (
    <Card className={classes.description}>
      <CardActionArea >
        <CardMedia
          component="img"
          id="description-Image"
          image={image}
          alt={title}
          onClick={handelProductDetail}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom className={classes.descriptonTypography} variant="h6" data-testid="productTitle">
            {title}
          </Typography>
          <Typography className={classes.descriptonTypography} variant="body2">
            <Rating
              value={value}
              size="large"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Typography>
          <Typography className={classes.descriptonTypography} variant="h6">
            {category}
          </Typography>
          <Typography className={classes.descriptonTypography} variant="h6">
            {numberFormat(price)}
          </Typography>
          {pathArray.includes("wishlist") ?
            <RemoveProduct id={id} title={title} />
            : (<></>)}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Description;