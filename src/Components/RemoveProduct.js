import React, { memo } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSnackBar, useWishList } from "./cartContext";

const useDeleteStyle= makeStyles({
  box:{
    display:"flex",
    float:'right',
    cursor:"pointer",
    marginTop:'-32px'
  }
})

const RemoveProduct = ({ id , title }) => {
  const { removeWishListItem } = useWishList();  
  const { addSnackbarItem } = useSnackBar();
  const classes=useDeleteStyle();

  const removeWishlist=(id)=>{
    removeWishListItem({id:id})
    addSnackbarItem(true,`${title}  is removed Successfully`,"success");
  }
  
  return (
    <Box className={classes.box} >
      <DeleteIcon
        fontSize="large"
        onClick={() =>  removeWishlist(id)}
      />
    </Box>
  );
};

export default memo(RemoveProduct);