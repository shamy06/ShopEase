import React,  { memo } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from "@mui/material";
import { useSnackBar, useWishList } from "./cartContext";

const AddtoWishList = ({ id, title }) => {  
  const { addWishListItem, wishListItems, removeWishListItem } = useWishList();
  const { addSnackbarItem } = useSnackBar();
  const loginUsername = localStorage.getItem("signUp");
  const navigate = useNavigate();
  
  const handleClick = (id) => {
    if (loginUsername) {
      if (wishListItems.some((item) => item.id === id)) {
        removeWishListItem({id:id})
        addSnackbarItem(true,`${title}  is removed Successfully`,"success");
      } else {
        addWishListItem({id:id})
       addSnackbarItem(true,`${title}  is added to wishlist Successfully`,"success");
      }
    } else {
      addSnackbarItem(true,"Login is Required","info");
      navigate("/login")
    }
  };

  return (
    <Box>
      { 
        wishListItems.some((item) => item.id === id)
          ? <FavoriteIcon fontSize='large' sx={{ color: 'deeppink' }} onClick={() => handleClick(id)} />
          : <FavoriteIcon fontSize="large" sx={{ color: 'lightpink' }} onClick={() => handleClick(id)} />
      }
    </Box>
  );
};

export default memo(AddtoWishList);