import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useNoPageFoundStyle=makeStyles({
 box:{
  marginTop:"2rem",
  textAlign: "center", 
  height: "73.8vh"
 }
})

const NotFoundPage = () => {
  const classes=useNoPageFoundStyle();

  return (
    <Box className={classes.box}>
      <h3>Page Not Found</h3>
    </Box>
  );
};

export default NotFoundPage;
