import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { BiLogIn } from "react-icons/bi";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSnackBar } from "./cartContext";

export const useStyles = makeStyles({
  logoutBox: {
    color: 'white',
    fontSize: '15px',
    display: 'flex',
    marginRight: '5px',
    textShadow: '5px 5px 10px #212121'
  },
  logoutIcon: {
    color: '#fff',
    display: 'flex',
    marginRight: '-1.7rem',
    float: 'right',
    fontSize: '25px',
    cursor: 'pointer',
    '@media (min-width: 0px) and (max-width:600px)': {
      marginRight: '-4rem', marginLeft: '1rem'
    }
  },
  loginRegisterText: {
    color: 'white',
    fontSize: '20px',
    display: 'block',
    '@media (min-width: 0px) and (max-width:1020px)': {
      display: 'none'
    }
  },
  loginIcon: {
    display: 'flex',
    position: "absolute",
    marginRight: "1rem",
    marginTop: "-1.8rem",
    fontSize: "25px",
    right: 0,
    color: "white",
    '@media (min-width: 1020px) and (max-width:1500px)': {
      display: 'none'
    }
  }
});

const Logout = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("signUp");
  const classes = useStyles();  
  const { addSnackbarItem } = useSnackBar();

  const logout = () => {
    localStorage.removeItem("signUp");
    navigate("/")
    navigate(0);
    addSnackbarItem(true, "Successfully LOGOUT!!", "success");
  };

  return localStorage.getItem("signUp") ? (
    <Box className={classes.logoutBox}>
      <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' } }} >Welcome {username}</Typography>
      <ExitToAppIcon className={classes.logoutIcon} onClick={logout} />
    </Box>
  ) : (<>
    <Box className={classes.loginRegisterText}>
      <NavLink to="/login">Login</NavLink>
      <span>/</span>
      <NavLink to="/registration">Register</NavLink>
    </Box>
    <Box className={classes.loginIcon}>
      <NavLink to="/login"><BiLogIn /></NavLink>
    </Box>
  </>
  );
};

export default Logout;