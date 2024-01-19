import React, { useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Description from "./Description";
import RemoveProductFromCart from "./RemoveProductFromCart";
import BuynowButton from "./BuynowButton";
import { numberFormat } from "./PriceFormat";
import Search from "./Search";
import { useStyles } from "./Util/CommonProductTemplate";
import { useCommonStyes } from "./Util/MuiStyles";
import { useCart } from "./cartContext";
import { useQuantityStyle } from "./Quantity";
import "../Component.css";

const useCartStyle = makeStyles({
  OuterBox: {
    margin: '2.5rem'
  },
  deleteIcon: {
    display: "flex",
    marginTop: "-32px",
    justifyContent: "flex-end",
    cursor: "pointer",
  },
  total: {
    fontWeight: "bold", 
    paddingLeft: '16px', 
    fontSize: "large"
  }
})

const Cart = ({ searchs,buynow, wishList }) => {
  const { cartItems, totalPrices, removeItem, search } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const cartLength = cartItems.length;
  const [quantity, setQuantity] = useState(1);
  const classes = useStyles();
  const commonPageStyle = useCommonStyes();
  const button = useQuantityStyle();
  const cartStyles = useCartStyle();

  const increase = (product) => {
    product.qnty += 1;
    setQuantity(quantity + 1);
  };

  const decrease = (product) => {
    if (quantity > 1 || product.qnty > 1) {
      product.qnty -= 1;
      setQuantity(quantity - 1);
    }
  };

  if (cartLength <= 0) {
    return (
      <Box
        className={commonPageStyle.emptyPage}
      >
        Cart is empty
      </Box>
    );
  } else {
    return (
      <Box className={commonPageStyle.OuterBox}>
        {search.length > 0 && typeof search !== "string" ? (
          <>
            <Search
              search={search}
            />
          </>
        ) : (<Grid container rowSpacing={1} columnSpacing={5}>
          {cartItems.map((product) => {
            const { id, image, title, rating, price, category, qnty } = product;
            return (
              <Grid
                item
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                sx={{ mb: 3 }}
                className={classes.grid}
                key={id}
              >
                <Card variant="outlined" className={classes.card}>
                  <Description
                    id={id}
                    image={image}
                    title={title}
                    rating={rating}
                    price={price}
                    category={category}
                  />
                  <Typography className={button.typography} variant="h6"
                  >
                    Quantity
                    <RemoveOutlinedIcon
                      className={button.minusIcon}
                      onClick={() => decrease(product)}
                    />
                    {qnty}
                    <AddOutlined
                      className={button.plusIcon}
                      onClick={() => increase(product)}
                    />
                  </Typography>
                  <Box className={cartStyles.deleteIcon}
                  >
                    <RemoveProductFromCart id={id} title={title} />
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        )}
        {search.length > 0 ? (
          ""
        ) : (
          <>
            <Box className={cartStyles.total}>
              Total {numberFormat(totalPrices)}
            </Box>
            <Box sx={{ m: 3 }}>
              <BuynowButton id={cartItems} buynow={buynow} />
            </Box>
          </>
        )}
      </Box>
    );
  }
};

export default Cart;