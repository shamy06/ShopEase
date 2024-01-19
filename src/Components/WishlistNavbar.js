import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from "@mui/styles";
import { useSearchProducts, useSnackBar } from "./cartContext";
import "../Component.css";

const usewishListNavbarStyles = makeStyles({
  box: {
    margin: '12px',
    paddingTop: '8px',
    flexGrow: 1,
    marginLeft: '26px',
    display: 'flex',
    '@media (min-width: 0px) and (max-width:600px)': {
      display: 'none'
    },
    '@media (min-width: 600px) and (max-width:900px)': {
      marginRight: ' -8px',
      marginLeft: '16px',
      display: 'flex'
    },
  },
  icon: {
    color: 'deeppink',
    cursor: 'pointer',
  },
  count: {
    color: 'white',
    marginTop: '-.5rem',
    fontSize: '18px'
  }
})

const WishListNavbar = ({ wishListItemCount }) => {  
  const { addSnackbarItem } = useSnackBar();
  const navigate = useNavigate();
  const classes = usewishListNavbarStyles();
  const {searchFilter} = useSearchProducts();
  
  const clearSearch = () => {
    if (localStorage.getItem("signUp")) {
      navigate("/wishlist");
      searchFilter("");
    } else {
      navigate("/login");
      addSnackbarItem(true, "Login Required", "info");
    }
  };
  
  return (
    <>
      <Box className={classes.box}>
        <FavoriteIcon fontSize="large" className={classes.icon} onClick={clearSearch} />
        <Box className={classes.count}>
          {wishListItemCount > 0 ? wishListItemCount : false}
        </Box>
      </Box>
    </>
  );
};

export default WishListNavbar;