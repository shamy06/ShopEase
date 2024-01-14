import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, } from "react-bootstrap";
import {
  datalistDispatch,
  categoryProducts,
  categorySearch,
  searchDispatch,
  wishListSearch,
  cartListSearch,
} from "../Redux/Action/ProductAction";
import { TextField,InputAdornment } from "@material-ui/core";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box } from "@mui/material";
import "../Component.css"


const NavBarSearchDropDrown = ({dataList}) => {
  const [click, setClick] = useState(false);
  const [searchText,setSearchText]=useState("");
  const handleClick = () => setClick(!click);
  const location = useLocation();
  const { pathname } = location;
  const pathArray = pathname.split("/");
  const dispatch = useDispatch();

  const categoryHandler = (category) => {
    dispatch(categoryProducts(category));
  };

  const onSearchMatch = (text) => {
    dispatch(searchDispatch(text));
    setSearchText(text)
    dispatch(datalistDispatch(""));
  };

  const searchHandler = (e) => {
    if (
      pathArray.includes("categories") === true &&
      e.target.value.length > 0
    ) {
      dispatch(categorySearch(e.target.value));
      setSearchText(e.target.value);
    }else if (
      pathArray.includes("wishlist") === true &&
      e.target.value.length > 0
    ) {
      dispatch(wishListSearch(e.target.value));
      setSearchText(e.target.value);
    }else if (
      pathArray.includes("cart") === true &&
      e.target.value.length > 0
    ) {
      dispatch(cartListSearch(e.target.value));
      setSearchText(e.target.value);
    } else if (e.target.value.length > 0) {
      dispatch(datalistDispatch(e.target.value));
      setSearchText(e.target.value);
    } else {
      dispatch(datalistDispatch(""));
      dispatch(searchDispatch(""));
      setSearchText("");
    }
  };

  const clearSearch = () => {
    dispatch(datalistDispatch(""));
    dispatch(searchDispatch(""));
    setSearchText("");
  };
 
  return (
    <>
        <div className="dropDown" onClick={clearSearch}>
          <Dropdown>
            <Dropdown.Toggle variant="success" className="Drop-category">
             <p className="categoryText">Categories</p>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-list">
              <Dropdown.Item
                className="dropdown-item"
                onClick={(e) => categoryHandler("smartphones")}
              >
                <Link
                  to="/categories/smartphones"
                  className="nav-links"
                  onClick={handleClick}
                >
                  <i
                    className="fa fa-mobile"
                    id="smartPhoneIcon"
                  ></i>
                  <div id="smartPhoneText">
                    Smartphones
                  </div>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => categoryHandler("fragrances")}>
                <Link
                  to="/categories/fragrances"
                  className="nav-links"
                  onClick={handleClick}
                >
                  <i
                    className="fa fa-gift"
                    id="giftIcon"
                  ></i>
                  <div className="giftText">
                    Fragrances
                  </div>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => categoryHandler("skincare")}>
                <Link
                  to="/categories/skincare"
                  className="nav-links"
                  onClick={handleClick}
                >
                  <i
                    className="fa fa-solid fa-snowflake"
                    id="skinCareIcon"
                  ></i>
                  <div className="giftText">
                    Skincare
                  </div>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => categoryHandler("groceries")}>
                <Link
                  to="/categories/groceries"
                  className="nav-links"
                  onClick={handleClick}
                >
                  <i
                    className="fa fa-shopping-basket"
                    id="shoppingIcon"
                  ></i>
                  <div className="giftText">
                    Groceries
                  </div>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      <div className="search-container" onSubmit={onSearchMatch}>
         <Box sx={{mt:"4%",height:"67%", p:"2%",backgroundColor:"white"}}> 
         <TextField placeholder="Search"  variant="standard" size="small"  value={searchText} fullWidth onChange={searchHandler}
            onKeyUp={(e) => { if (e.key === "Enter") onSearchMatch(searchText)}}
            InputProps={{ disableUnderline: true, endAdornment:(<InputAdornment position="end" variant="filled"><SearchOutlinedIcon onClick={()=>onSearchMatch(searchText)} /></InputAdornment>)}}
            />
            </Box>
            {pathname.toLowerCase().includes("categories")
              ? dataList.map((item, index) => (
                <div id="searchResults"
                    key={index}
                    onClick={() => onSearchMatch(item.title)}
                  >
                    {item.title}
                    </div>
                ))
              : pathname.toLowerCase().includes("wishlist") ?
                dataList.map((item, index) => (
                <div id="searchResults"                  
                    key={index}
                    onClick={() => onSearchMatch(item.title)}
                  >
                    {item.title}                    
                  </div>                      
                ))
                :pathname.toLowerCase().includes("cart") ?
                dataList.map((item, index) => (
                <div id="searchResults"                  
                    key={index}
                    onClick={() => onSearchMatch(item.title)}
                  >
                    {item.title}                    
                  </div>
                ))
                  :
                dataList.map((item, index) => (
                <div id="searchResults"                  
                    key={index}
                    onClick={() => onSearchMatch(item.title)}
                  >
                    {item.title}                    
                  </div>
                ))
                }
      </div>
    </>
  );
};

export default NavBarSearchDropDrown;