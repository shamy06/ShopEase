import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCart, useSearchProducts, useSearchbyDataList, useWishList } from "./cartContext";
import { BsShopWindow } from "react-icons/bs";
import WishListNavbar from "./WishlistNavbar";
import CartNavbar from "./CartNavbar";
import NavBarSearchDropDrown from "./NavbarDropDown";
import Logout from "./Logout";
import "../Component.css";

const useNavbarStyles = makeStyles({
  box: {
    display: "flex",
    backgroundColor: "#1f5156",
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    height: '80px',
  },
  box2: {
    marginLeft: '24px',
    cursor: 'pointer',
    color: 'white'
  },
  logoutBox: {
    left: 0,
    marginLeft: '-2rem',
    marginRight: '3rem'
  },
  typography: {
    display: 'flex',
    fontSize: '1.8rem !important',
    '@media (min-width: 0px) and (max-width:600px)': {
      display: 'none',
    },
    '@media (min-width: 600px) and (max-width:900px)': {
      fontSize: '1.2rem !important',
    },
  },
  homeIcon: {
    marginLeft: '-8px !important',
    marginRight: '16px !important',
    fontSize: '2rem !important',
    display: 'none',
    '@media (min-width: 0px) and (max-width:600px)': {
      display: 'flex',
    },
  },
})

const NavBar = () => {
  const classes = useNavbarStyles();
  const loginUsername = localStorage.getItem("signUp");
  const { cartItems } = useCart();
  const cartsItemCount = cartItems.length;
  const { wishListItems } = useWishList();
  const wishListItemCount = wishListItems.length;
  const { searchByDataList, dataList } = useSearchbyDataList();
  const { searchFilter } = useSearchProducts();

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/')
    searchFilter("")
  }

  const clearSearch = () => {
    searchByDataList("");
  };

  return (
    <>
      <Box className={classes.box} onClick={clearSearch}>
        <Box className={classes.box2}>
          <Typography className={classes.typography} onClick={handleLogoClick}>
            Shopping Cart
          </Typography>
          <Typography className={classes.homeIcon} onClick={handleLogoClick}>
            <BsShopWindow />
          </Typography>
        </Box>
        <NavBarSearchDropDrown dataList={dataList} />
        <WishListNavbar wishListItemCount={wishListItemCount} />
        <CartNavbar cartsItemCount={cartsItemCount} />
        <Box className={classes.logoutBox}>
          <Logout loginUsername={loginUsername} />
        </Box>
      </Box>
    </>
  );
};

export default NavBar;