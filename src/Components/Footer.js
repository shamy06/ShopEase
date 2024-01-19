import React from "react";
import { Box } from "@mui/material";
// import { Typography } from "antd";
import { ModalFooter } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material"; 
import "../Component.css";

const useFooterStyle=makeStyles({
  footerStyles:{
    width: "100%",
    textAlign: "center",
    display:'flex',
    justifyContent:"center",
    paddingTop: "4px",
    fontSize: "16px",
    marginBottom: 0,
    color: "white",
  }
})

const Footer = () => {
  const classes=useFooterStyle();

  return (
    <ModalFooter className="footer-dark">
      <Box>
        <Typography
          variant="content" className={classes.footerStyles}
        >
          Shopping Cart © 2022
        </Typography>
      </Box>
    </ModalFooter>
  );
};

export default Footer;