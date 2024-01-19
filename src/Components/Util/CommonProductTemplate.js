import React from "react";
import { ButtonGroup, Card, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AddtoCart from "../AddToCart";
import AddtoWishList from "../AddToWishList";
import BuynowButton from "../BuynowButton";
import Description from "../Description";
import Quantity from "../Quantity";

export const useStyles = makeStyles({
  card: {
    width: "100%",
    marginBottom: "1rem",
    height: "fit-content",
    border: "2px solid #ddd",
    boxShadow: "2px 3px 5px 2px #999",
    "@media (min-width: 600px) and (max-width:900px)": {
      width: "90%",
    },
    "@media (min-width: 300px) and (max-width:500px)": {
      width: "100%",
    },
    "@media (min-width: 500px) and (max-width:600px)": {
      width: "70%",
    },
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  categories: {
    margin: "2rem",
  },
  buttonGroup: {
    display: "flex !important",
    justifyContent: "space-between ",
  },
});

const CommonProductTemplate = ({ product }) => {
  const classes = useStyles();
  const location = useLocation();
  const { pathname } = location;
  const pathArray = pathname.split("/");

  return (
    <>
      {product.map((products) => {
        const { id, title, image, rating, category, price } = products;
        return (
          <Grid
            item
            xl={3}
            lg={3}
            md={4}
            sm={6}
            xs={12}
            className={classes.grid}
            key={id}
          >
            <Card variant="outlined" className={classes.card}>
              {pathArray.includes("wishlist" || "cart") ? (
                <></>
              ) : (
                <AddtoWishList id={id} title={title} />
              )}
              <Description
                id={id}
                image={image}
                title={title}
                rating={rating}
                price={price}
                category={category}
              />
              {pathArray.includes("wishlist") ? (
                <></>
              ) : (
                <Quantity product={products} />
              )}
              {pathArray.includes("cart") ? (
                <></>
              ) : (
                <ButtonGroup
                  className={classes.buttonGroup}
                  variant="contained"
                  size="medium"
                >
                  <BuynowButton id={id} />
                  <AddtoCart id={id} title={title} />
                </ButtonGroup>
              )}
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default CommonProductTemplate;