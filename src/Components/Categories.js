import React from "react";
import { Box, Grid } from "@mui/material";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useSearchByCategory } from "./cartContext";
import CommonProductTemplate, { useStyles } from "./Util/CommonProductTemplate";
import Search from "./Search";
import "../Component.css";

const Categories = () => {
  const classes = useStyles();
  const { search } = useSearchByCategory();
  const { category } = useParams();
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData('elements');

  const categories = data.filter((item) =>
    item.category.toLowerCase().includes(category.toLowerCase())
  );

  return (
    <Box className={classes.categories} >
      {search.length > 0 ? (
        <Box>
          <Search search={search} />
        </Box>
      ) : <Grid container rowSpacing={1} columnSpacing={5}>
        <CommonProductTemplate product={categories} />
      </Grid>
      }
    </Box>
  );
};

export default Categories;