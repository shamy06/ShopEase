import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { TableBody } from "semantic-ui-react";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import AddtoWishList from "./AddToWishList";
import { numberFormat, Offers } from "./PriceFormat";
import Checkout from "./Checkout";
import { useBuynow, useSearchProducts } from "./cartContext";
import OrderItems, { BuynowCheckBox, BuynowPlaceOrder, BuynowProductDetails } from "./BuynowSubItems";

const useBuynowStyle = makeStyles({
  grid: {
    width: "98%",
    marginLeft: "25px",
    marginBottom: "42px",
    '@media (min-width: 0px) and (max-width:1400px)': {
      width: "95%",
      marginLeft: "15px"
    },
  },
  card: {
    marginTop: "1rem",
    boxShadow: "2px 2px 7px 2px #999",
    border: "2px solid #ddd",
    marginBottom: "1rem",
    padding: "4px 18px 0px 0px",
  },
  qnty: {
    cursor: "pointer",
    margin: '8px',
    marginTop:'0px',
    backgroundColor: "lightblue",
    fontSize: "20px",
  },
  deleteIcon: {
    cursor: "pointer",
    fontSize: "32px !important",
    marginLeft:"15px",
    '@media (min-width: 0px) and (max-width:600px)': {
      marginLeft: "40px"
    },
  },
  wishListIcon: {
    float: "right",
    display: "inline-flex",
    cursor: "pointer",
    width: "fit-content",
    height: "fit-content",
  },
  qntySubHeading: {
    display: "inline-flex",
    // position:"absolute",
    fontWeight: "549.5",
    fontSize: "large",
    textAlign: "right",
    float:"left",
    marginTop:"-1.3rem  !important",
    marginLeft: "8rem !important",
    // width: "fit-content",
  },
  totalPriceCard: {
    border: "2px solid #ddd",
    boxShadow: "2px 2px 7px 2px #999",
  },
  couponValidation: {
    marginBottom: "12px",
    color: "green",
    fontSize: "15.5px",
    fontWeight: 500,
  },
  removeButton: {
    float: 'right',
    color: 'red',
    marginTop: '-32px',
    cursor: 'pointer'
  },
  couponBox: {
    display: "inline-flex",
    marginBottom: "15px",
    borderColor: "#ddd",
    borderRadius: "4px",
    boxShadow: "3px 3px 5px #ddd",
  },
  applyButton: {
    float: "right",
    marginRight: '12px',
    marginTop: '8px',
    display: "inline-flex",
    cursor: "pointer"
  },
  couponError: {
    marginBottom: "10px",
    color: "red",
    fontSize: "15.5px",
    fontWeight: 500,
  },
  tableCellHeading: {
    paddingLeft: '0 !important',
    fontWeight: '550 !important',
    fontSize: "20px !important",
    border: '0 !important',
  },
  tableCell: {
    paddingBottom: '0 !important',
    fontSize: "14px !important"
  },
})

const Buynow = () => {
  const { buynowItems, removeBuynowItem } = useBuynow();
  const [buynowState, setBuynowState] = useState({
    totalPrice: 0,
    totalOrder: 0,
    formatedPrice: 0,
    quantity: 0,
    discountedVlaue: 0,
    couponValidation: false,
    invalidCouponCode: 0,
    couponCodeMsg: "",
    couponCode: "",
    offer1: 0,
  });
  const navigate = useNavigate();
  const classes = useBuynowStyle();
  const { search } = useSearchProducts();

  const buynowTotalprice = () => {
    let totalprice = 0;
    buynowItems.map((item) => {
      totalprice = Math.round(
        ((item.price * item.qnty + totalprice) * 100) / 100
      );
    });
    setBuynowState({
      ...buynowState,
      formatedPrice: totalprice + 80,
      totalPrice: numberFormat(totalprice),
      totalOrder: buynowState.formatedPrice,
      invalidCouponCode: false,
    });
    if (buynowState.couponValidation && !buynowState.invalidCouponCode) {
      if (buynowState.formatedPrice < 999 && !buynowState.offer1) {
        setBuynowState({
          ...buynowState,
          couponValidation: false,
          offer1: false,
          discountedVlaue: 0,
        });
      } else if (buynowState.formatedPrice < 499) {
        setBuynowState({
          ...buynowState,
          couponValidation: false,
          discountedVlaue: 0,
        });
      } else {
        if (buynowState.couponValidation) applyCode();
      }
    }
  };



  useEffect(() => {
    buynowTotalprice();
  }, [buynowState.quantity, buynowState.totalPrice, buynowState.discountedVlaue]);

  const increase = (item) => {
    item.qnty += 1;
    setBuynowState({ ...buynowState, quantity: buynowState.quantity + 1 });
  };

  const decrease = (item) => {
    if (item.qnty > 1) {
      item.qnty -= 1;
      setBuynowState({ ...buynowState, quantity: buynowState.quantity - 1 });
    }
  };

  const handleCoupon = (e) => {
    setBuynowState({ ...buynowState, couponCode: e.target.value });
  };

  const removeCoupon = () => {
    setBuynowState({
      ...buynowState,
      couponValidation: false,
      discountedVlaue: 0,
      offer1: false,
      totalOrder: buynowState.formatedPrice,
    });
  };

  const applyCode = () => {
    switch (buynowState.couponCode) {
      case "NEW200":
        if (buynowState.formatedPrice > 999) {
          let value1 = buynowState.formatedPrice - 200;
          setBuynowState({
            ...buynowState,
            discountedVlaue: 200,
            totalOrder: value1,
            couponValidation: true,
            invalidCouponCode: false,
          });
        } else {
          setBuynowState({
            ...buynowState,
            couponValidation: false,
            invalidCouponCode: false,
            couponCodeMsg: "The Coupon only for price above ₹999 only.",
          });
        }
        break;
      case "NEW20":
        if (buynowState.formatedPrice > 499) {
          let value2 = ((buynowState.formatedPrice - 80) * 20) / 100;
          setBuynowState({
            ...buynowState,
            discountedVlaue: value2,
            totalOrder: buynowState.formatedPrice - value2,
            couponValidation: true,
            invalidCouponCode: false,
            offer1: true,
          });
        } else {
          setBuynowState({
            ...buynowState,
            couponValidation: false,
            invalidCouponCode: false,
            couponCodeMsg: "The Coupon only for price above ₹499 only.",
          });
        }
        break;
      case "NEW5":
        if (buynowState.formatedPrice > 1599) {
          let value3 = ((buynowState.formatedPrice - 80) * 5) / 100;
          setBuynowState({
            ...buynowState,
            discountedVlaue: value3,
            totalOrder: buynowState.formatedPrice - value3,
            couponValidation: true,
            invalidCouponCode: false,
          });
        } else {
          setBuynowState({
            ...buynowState,
            couponValidation: false,
            invalidCouponCode: false,
            couponCodeMsg: "The Coupon only for price above ₹1,599 only.",
          });
        }
        break;
      default:
        setBuynowState({
          ...buynowState,
          couponValidation: false,
          invalidCouponCode: true,
        });
    }
  };
  if (buynowItems.length <= 0) {
    navigate("/");
  } else if (search.length > 0) {
    navigate("/");
  } else {
    return (
      <Grid className={classes.grid}>
        <OrderItems buynowItemslength={buynowItems.length} />
        <Grid container columnSpacing={8}>
          <Grid item lg={8} xs={12} md={7} xl={7.6}>
            <Checkout />
            <Offers />
            <Card
              variant="outlined"
              className={classes.card}
            >
              {buynowItems.map((item) => {
                const {
                  image,
                  title,
                  subTitle,
                  price,
                  id,
                  qnty,
                  shortDescription,
                } = item;
                return (
                  <Box className={classes.mainBox} key={id}>
                    <BuynowProductDetails item={item} />
                    
                    <Box className={classes.wishListIcon}
                    >
                      <AddtoWishList
                        id={id}
                        title={title}
                      />
                    </Box><Box className={classes.qntySubHeading}
                    >
                      Quantity
                      <RemoveOutlined className={classes.qnty}
                        onClick={() => decrease(item)}
                      />
                      {qnty}
                      <AddOutlined className={classes.qnty}
                        onClick={() => increase(item)}
                      />
                      <DeleteIcon className={classes.deleteIcon}
                        onClick={() => (
                          removeBuynowItem({ id: id }), decrease(item)
                        )}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Card>
          </Grid>
          <Grid item lg={4} xs={12} md={5} xl={4.2} sx={{ mt: { lg: 6.9, xs: 2, md: 6.9 } }}>
            <Card
              variant="outlined" className={classes.totalPriceCard}
            >
              <CardContent>
                {buynowState.couponValidation ? (<>
                  <Box className={classes.couponValidation}
                  >
                    Coupon code applied successfully</Box>
                  <Box onClick={removeCoupon} className={classes.removeButton} > Remove</Box>
                </>
                ) : (
                  <>
                    <Box className={classes.couponBox}
                    >
                      <TextField
                        variant="outlined"
                        label="Apply Coupon"
                        size="small"
                        onChange={handleCoupon}
                      />
                    </Box>
                    <Box className={classes.applyButton}
                      onClick={applyCode}
                    >
                      Apply
                    </Box>
                    {buynowState.invalidCouponCode ? (
                      <Box className={classes.couponError}
                      >
                        The Coupon code is not valid.
                      </Box>
                    ) : (
                      <Box sx={{ color: "red" }}>
                        {buynowState.couponCodeMsg}
                      </Box>
                    )}
                  </>
                )}
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableCellHeading}
                        >
                          Price Details
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Price
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableCell}
                        >
                          {buynowState.totalPrice}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Delivery
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableCell}
                        >
                          ₹80.00
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Product Discount
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.tableCell}
                        >
                          {numberFormat(buynowState.discountedVlaue)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Total Amount
                        </TableCell>
                        <TableCell className={classes.tableCell}
                          align="right"
                        >
                          {numberFormat(buynowState.totalOrder)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <BuynowPlaceOrder />
            </Card>
            <BuynowCheckBox />
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default Buynow;