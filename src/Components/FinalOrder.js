import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useOrderStyles=makeStyles({
  placeOrderStyles:{
    height: "73.8vh",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  }
})

const PlaceOrder = () => {
  const classes=useOrderStyles();

  return (
    <>
      <Box className={classes.placeOrderStyles}
      >
        <Typography variant="h4">Your order has been placed.</Typography>
      </Box>
    </>
  );
};

export default PlaceOrder;