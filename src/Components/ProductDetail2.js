import React from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import AddtoCart from "./AddToCart";
import AddtoWishList from "./AddToWishList";
import Quantity from "./Quantity";
import BuynowButton from "./BuynowButton";
import Specification from "./Specification";
import Imageslider from "./Imageslider";
import { numberFormat } from "./PriceFormat";
import { makeStyles } from "@mui/styles";
import Ratings from "./RatingsAndAddressCard";

export const useProductDetailStyle = makeStyles({
    columnOneBox: {
      paddingLeft:"15px",
      '@media (min-width: 0px) and (max-width:600px)': {
        marginBottom: '16px',
      },
      '@media (min-width: 600px) and (max-width:1200px)': {
        marginRight: '4rem !important',
      },
    },
    subTitle: {
      fontStyle: "italic",
      '@media (min-width: 0px) and (max-width:600px)': {
        marginTop: "16px !important",
      },
    },
    imageBox: {
      border: "2px solid black",
      width: "24.6vw",
      height: "420px",
      marginTop: "6px",
      '@media (min-width: 0px) and (max-width:600px)': {
        width: "95%",
        height: "350px",
        marginTop: "4px",
        marginBottom: "6rem"
      },
      '@media (min-width: 600px) and (max-width:1200px)': {
        height: "380px",
        width:"100%",
        marginTop: "24px",
        marginBottom: "9rem"
      }
    },
    price: {
      marginLeft: '24px !important', marginTop: '8px'
    },
    buttonGroup: {
      marginTop: '32px',
      marginBottom: '16px',
      display: "flex",
      '@media (min-width: 600px) and (max-width:1200px)': {
        display: "none !important",
      }
    },
    productDescription: {
      fontSize: "16px",
      padding: "15px 24px 15px 24px"
    },
    productDescriptionHeading: {
      marginLeft: '24px !important',
      marginTop: '8px !important',
      padding: "20px 24px 10px 4px !important",
      fontWeight: "550 !important",
      fontSize: '20px !important',
    },
    card: {
      border: "2px solid #ddd",
      marginTop: "8px",
      boxShadow: "2px 2px 4px 2px #999",
    },
    quantity: {
      display: "flex",
      justifyContent: "left !important",
      marginLeft: '24px',
      marginTop: '4.5px',
    },
    button: {
      marginTop: '32px',
      marginBottom: '16px'
    }
  })

const ProductDetail2 =({singleProduct})=>{
    const classes = useProductDetailStyle();
    const {
        id,
        title,
        subTitle,
        thumbnails,
        price,
        description,
        category,
        rating,
        brand,
        memory,
        os,
        modelNumber,
        color
      } = singleProduct;
    
  const specifications={ memory, os, modelNumber, color }

    return(
        <Grid container>
              <Grid item lg={4} xl={4.5} md={5} xs={12} sm={5} className={classes.columnOneBox}>
                <Box className={classes.imageBox}
                >
                  <AddtoWishList id={id} title={title} />
                  <Imageslider thumbnails={thumbnails} />
                </Box>
                <Box sx={{ display: { lg: 'none', xl: 'none', sm: 'block', xs: 'none', md: 'block' } }}>
                  <Grid container columnSpacing={1} className={classes.button}>
                    <Grid item xs={5} lg={2} sm={5} sx={{ ml: { lg: 0, xs: 2 }, mr: { sm: 3 } }}>
                      <BuynowButton id={id} />
                    </Grid>
                    <Grid item xs={5} lg={10} sm={5}>
                      <AddtoCart id={id} title={title} />
                    </Grid>
                  </Grid>
                  <Ratings rating={rating} />
                </Box>
              </Grid>
              <Grid item lg={8} xl={7.5} md={6} xs={12} sm={5.5} className={classes.subTitle}>
                <Typography fontSize="25px" component="h2" sx={{ ml: 3 }} data-Testid="productTitle">
                  {subTitle}
                </Typography>
                <Typography variant="h5" className={classes.price}>
                  {numberFormat(price)}
                </Typography>
                <Box className={classes.quantity}
                >
                  <Quantity product={singleProduct} />
                </Box>
                <Card
                  variant="outlined" className={classes.card}
                >
                  <Typography className={classes.productDescriptionHeading}
                  >
                    Product Description
                  </Typography>
                  <Card
                    variant="outlined" className={classes.productDescription}
                  >
                    <p>{description}</p>
                  </Card>
                </Card>
                {category === "smartphones" ? (
                  <Specification
                    specifications={specifications}
                    brand={brand}
                  />
                ) : (
                  ""
                )}
                <Box data-Testid="Rating" sx={{ display: { lg: 'block', xl: 'block', sm: 'none', xs: 'block', md: 'none' } }}>
                  <Ratings rating={rating} />
                </Box>
                <Grid container columnSpacing={1} className={classes.buttonGroup} >
                  <Grid item xs={5} lg={2} sx={{ ml: { lg: 0, xs: 2 } }} data-Testid="Buy">
                    <BuynowButton id={id}  />
                  </Grid>
                  <Grid item xs={5} lg={10} data-Testid="Add">
                    <AddtoCart id={id} title={title} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
    )
}

export default ProductDetail2;