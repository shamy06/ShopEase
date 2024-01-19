import React from "react";
import { Box, Grid } from "@mui/material";
import { useCommonStyes } from "./Util/MuiStyles";
import Search from "./Search";
import CommonProductTemplate from "./Util/CommonProductTemplate";
import { useWishList } from "./cartContext";
import "../Component.css";

const Wishlist = () => {
  const { wishListItems, search } = useWishList();
  const commonPageStyle = useCommonStyes();

  if (wishListItems.length <= 0) {
    return (
      <Box className={commonPageStyle.emptyPage} >
        WishList is Empty!!
      </Box>
    );
  } else {
    return (
      <Box className={commonPageStyle.OuterBox} >
        <Grid container rowSpacing={1} columnSpacing={5}>
          {search.length > 0 && typeof search !== "string" ?
            <Box sx={{ flexGrow: 1, ml: 5 }}>
              <Search
                search={search}
              />
            </Box>
            : <CommonProductTemplate product={wishListItems} />}
        </Grid>
      </Box>
    );
  }
};

export default Wishlist;