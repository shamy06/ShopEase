import React,{ memo } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "../Component.css";

const useCartNavbarStyles = makeStyles({
  cartNavbar: {
    color: "white",
    marginTop: "8px",
    display: 'flex',
    '@media (min-width: 0px) and (max-width:600px)': {
      display: 'none'
    },
    '@media (min-width: 600px) and (max-width:900px)': {
      marginRight: '.5rem'
    },
    flexGrow: 1
  },
  cartCount: {
    color: 'white',
    marginTop: '-.6rem',
    fontSize: '18px'
  },
})

const CartNavbar = ({ cartsItemCount }) => {
  const classes = useCartNavbarStyles();
  return (
    <>
      <Box className={classes.cartNavbar}>
        <Link to="/cart">
          <ShoppingCartIcon fontSize="large"
          />
        </Link>
        <Box className={classes.cartCount}>
          {cartsItemCount > 0 ? cartsItemCount : false}
        </Box>
      </Box>
    </>
  );
};

export default memo(CartNavbar);