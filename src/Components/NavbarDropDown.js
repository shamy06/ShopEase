import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSearchByCart, useSearchByCategory, useSearchByWishList, useSearchProducts, useSearchbyDataList } from "./cartContext";
import "../Component.css";

const useStyles = makeStyles({
  categoryBox: {
    display: 'flex',
    marginTop: "4px",
    marginRight: '4.5rem',
    marginLeft: '4rem',
    cursor: "pointer",
    '@media (min-width: 0px) and (max-width:500px)': {
      marginRight: '0rem',
      marginLeft: '.1rem',
    },
    '@media (min-width: 500px) and (max-width:1200px)': {
      marginRight: '2rem',
      marginLeft: '2rem',
    }
  },
  buttonCss: {
    width: '100%',
    size: 'large',
    '@media (min-width: 300px) and (max-width:500px)': {
      width: '78%',
      size: 'small',
    },
  },
  list: {
    width: '100.2%',
    padding: "0",
    margin: "0",
    marginLeft:"0px",
    height: "56%",
    border: "1.5px solid grey",
    borderBottomLeftRadius:5,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    borderTopLeftRadius:5,
    backgroundColor: "#E8E8E8",
    position: "relative",
    zIndex: 99,
    cursor:"pointer",
    '@media (min-width: 0px) and (max-width:600px)': {
      height: 'fit-content',
    },
    '@media (min-width: 600px) and (max-width:900px)': {
      height: '50px'
    }
  },
  listButton: {
    paddingLeft: "0",
    paddingTop: "0",
    marginTop: "6px",
    marginLeft: "12px",
    '@media (min-width: 0px) and (max-width:600px)': {
      paddingRight: "0 !important",
      paddingLeft: "0 !important",
      paddingBottom: "0 !important"
    }
  },
  searchBox: {
    marginTop: "7%",
    // height: "69%",
    padding: "2%",
    paddingLeft: "4%",
    backgroundColor: "white",
    border: "1.5px solid grey",
    borderBottomLeftRadius:4,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,
    borderTopLeftRadius:4, 
    '@media (min-width: 0px) and (max-width:600px)': {
      marginTop: "12px !important"
    }
  } 
})

const NavBarSearchDropDrown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { searchByDataList, dataList } = useSearchbyDataList();
  const { searchFilter } = useSearchProducts();
  const { searchWishList } = useSearchByWishList();
  const { searchCarts } = useSearchByCart();
  const { searchCategories } = useSearchByCategory();
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const location = useLocation();
  const { pathname } = location;
  const pathArray = pathname.split("/");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSearchMatch = (text) => {
    searchFilter(text);
    setSearchText(text);
    searchByDataList("");
  };

  const searchHandler = (e) => {
    if (
      pathArray.includes("categories") === true &&
      e.target.value.length > 0
    ) {
      const categoryValue = pathArray[2];
      searchCategories(e.target.value, categoryValue)
      setSearchText(e.target.value);
    } else if (
      pathArray.includes("wishlist") === true &&
      e.target.value.length > 0
    ) {
      searchWishList(e.target.value);
      setSearchText(e.target.value);
    } else if (
      pathArray.includes("cart") === true &&
      e.target.value.length > 0
    ) {
      searchCarts(e.target.value);
      setSearchText(e.target.value);
    } else if (e.target.value.length > 0) {
      searchByDataList(e.target.value)
      setSearchText(e.target.value);
    } else {
      searchByDataList("");
      searchFilter("");
      setSearchText("");
    }
  };

  useEffect(() => {
    setSearchText("");
  }, [location.pathname]);

  const clearSearch = () => {
    searchByDataList("");
    searchFilter("");
    setSearchText("");
  };

  const buttonStyle = {
    backgroundColor: "green",
    fontWeight: "500",
  }

  return (
    <>
      <Box className={classes.categoryBox} onClick={clearSearch}>
        <Button variant="contained"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className={classes.buttonCss}
          style={buttonStyle}
        >
          <Typography sx={{ fontSize: { xs: '13px' } }}>Categories</Typography>
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          sx={{ width: { xl: "100%", md: "100%", xs: "37.5%" } }}
        >
          <MenuItem >
            <Link
              to="/categories/smartphones"
              onClick={handleClose}
            >
              <PhoneAndroidIcon sx={{ fontSize: { lg: "23px", xl: "23px", md: "23px", sm: "23px", xs: "18px" }, mr: "2px", ml: { lg: "-5px", xs: "-12px", sm: "-5px", md: "-5px" }, color: "rebeccapurple" }} />
              Smartphones
            </Link>
          </MenuItem>
          <MenuItem >
            <Link
              to="/categories/fragrances"
              onClick={handleClose}
            >
              <CardGiftcardIcon sx={{ color: "rosybrown", mr: "2px", ml: { lg: "-5px", xs: "-12px", sm: "-5px", md: "-5px" }, fontSize: { lg: "24px", xl: "24px", md: "24px", sm: "24px", xs: "23px" } }} />
              Fragrances
            </Link>
          </MenuItem>
          <MenuItem >
            <Link
              to="/categories/skincare"
              onClick={handleClose}
            >
              <AcUnitIcon sx={{ color: "lightcoral", mr: "2px", ml: { lg: "-5px", xs: "-12px", sm: "-5px", md: "-5px" }, fontSize: "24px" }} />
              Skincare
            </Link>
          </MenuItem>
          <MenuItem pt={0} m={0}>
            <Link
              to="/categories/groceries"
              onClick={handleClose}
            >
              <ShoppingBasketOutlinedIcon sx={{ color: "orange", fontSize: "24px", ml: { lg: "-5px", xs: "-12px", sm: "-5px", md: "-5px" }, mr: "5px" }} />
              Groceries
            </Link>
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ display: "block", mr: '2rem', mt: { xs: 4, sm:3,md:2, lg: -1 }, width: { lg: '27%', xl: '27%', xs: '45%', sm: '30%' }, pt: '10px', pb: '15px', height: '100%', borderRadius: '2px solid transparent', borderBottom: '3px solid transparent' }} onSubmit={onSearchMatch}>
        <Box className={classes.searchBox}
        >
          <TextField
            placeholder="Search"
            variant="standard"
            size="small"
            value={searchText}
            fullWidth
            onChange={searchHandler}
            onKeyUp={(e) => {
              if (e.key === "Enter") onSearchMatch(searchText);
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end" variant="filled">
                  <SearchOutlinedIcon
                    onClick={() => onSearchMatch(searchText)}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {pathname.toLowerCase().includes("categories")
          ? dataList.map((item) => (
            <Box className={classes.list}>
                <Box onClick={() => onSearchMatch(item.title)} className={classes.listButton}>
                      <Typography sx={{fontWeight: "bold"}}>{item.title}</Typography>
                </Box>
            </Box>
          ))
          : pathname.toLowerCase().includes("wishlist")
            ? dataList.map((item) => (
              <Box className={classes.list}>
                  <Box onClick={() => onSearchMatch(item.title)} className={classes.listButton}>
                      <Typography sx={{fontWeight: "bold"}}>{item.title}</Typography>
                  </Box>
              </Box>
            ))
            : pathname.toLowerCase().includes("cart")
              ? dataList.map((item) => (
                <Box className={classes.list}>
                    <Box onClick={() => onSearchMatch(item.title)} className={classes.listButton}>
                      <Typography sx={{fontWeight: "bold"}}>{item.title}</Typography>
                    </Box>
                </Box>
              ))
              : dataList.map((item) => (
                <Box className={classes.list}>
                    <Box onClick={() => onSearchMatch(item.title)} className={classes.listButton}>
                      <Typography sx={{fontWeight: "bold"}}>{item.title}</Typography>
                    </Box>
                </Box>
              ))}
      </Box>
    </>
  );
};

export default NavBarSearchDropDrown;