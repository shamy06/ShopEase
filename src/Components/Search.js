import React from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CommonProductTemplate from "./Util/CommonProductTemplate";

const useNoProductfoundStyle = makeStyles({
  grid: {
    marginTop: '1.5rem',
    marginLeft: '-10px !important',
    width:"100%",
    marginBottom:".3rem"
  },
  box: {
    display: "flex",
    fontSize: "3.2rem",
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    width: "100%",
    height: '10vh',
    '@media (min-width: 0px) and (max-width:600px)': {
      fontSize: "2rem",
      height: '20vh'
    },
  }
})

const Search = ({search}) => {
  const classes = useNoProductfoundStyle();
  return (
    <>
      <Grid container rowSpacing={0} columnSpacing={5} className={classes.grid}>
        {
          typeof search !== "string" ? (
            <CommonProductTemplate product={search} />
          ) : (
            <Box className={classes.box}>
              No Product found
            </Box>
          )}
      </Grid>
    </>
  );
};

export default Search;