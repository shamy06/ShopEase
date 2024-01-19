import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSnackBar } from "./cartContext";

const useLoginStyle = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80.2vh'
  },
  box2: {
    marginBottom: "10px"
  },
  loginError: {
    color: 'red',
    marginLeft: '1px'
  },
  loginButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  registertext: {
    marginTop: '12px !important',
    cursor: 'pointer'
  }
})

const Login = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
    emptypasswordError: false,
    emptyusernameError: false,
    usernameError: false,
    loginError: false,
    loginError2: false,
    apiUserData: "",
  });
  const [showHomePage, setshowHomePage] = useState(false);
  const localSignUp = localStorage.getItem("signUp");
  const navigate = useNavigate();
  const { addSnackbarItem } = useSnackBar();
  const classes = useLoginStyle();
  const username_Regex =
    /^(?=.{0,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

  useEffect(() => {
    if (localSignUp) {
      setLoginState({ ...loginState });
      setshowHomePage(true);
    }
  }, []);

  const userNameHandler = (e) => {
    const item = e.target.value;
    if (username_Regex.test(item)) {
      setLoginState({
        ...loginState,
        usernameError: false,
        username: item,
        emptyusernameError: false,
      });
    } else {
      if (item.length === 0) {
        setLoginState({
          ...loginState,
          emptyusernameError: true,
          loginError: false,
          loginError2: false
        });
      } else {
        setLoginState({
          ...loginState,
          usernameError: true,
          emptyusernameError: false,
        });
      }
    }
  };

  const passwordHandler = (e) => {
    const item = e.target.value;
    if (item.length === 0) {
      setLoginState({
        ...loginState,
        emptypasswordError: true,
        loginError: false,
      });
    } else {
      setLoginState({
        ...loginState,
        emptypasswordError: false,
        password: item,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userdata = JSON.parse(localStorage.getItem("userData") || "[]");
    const userlogin = userdata.filter((element) => {
      if (
        element.userName === loginState.username &&
        element.password === loginState.password
      ) {
        return (
          element.userName === loginState.username &&
          element.password === loginState.password
        );
      }
    });
    if (userlogin.length > 0) {
      setLoginState({ ...loginState });
      setshowHomePage(true);
      localStorage.setItem("signUp", loginState.username);
      addSnackbarItem(true, "LoggedIn Successfully", "success");
    } else {
      const uniqueUsername = userdata.map((e) => e.userName);
      const uniquePassword = userdata.map((e) => e.password);
      if (loginState?.username.length === 0) {
        
        setLoginState({ ...loginState, emptyusernameError: true });
      } else if (
        loginState?.username.length > 0 &&
        !uniqueUsername.includes(loginState.username)
      ) {
        setLoginState({
          ...loginState,
          loginError2: true,
          emptyusernameError: false,
        });
      } else if (loginState?.password.length === 0) {
        setLoginState({
          ...loginState,
          loginError2: false, emptypasswordError: true
        });
      } else if (loginState?.password.length > 0 &&
        !uniquePassword.includes(loginState.password)) {
        setLoginState({
          ...loginState,
          loginError: true,
          loginError2: false,
          emptypasswordError: false,
          emptyusernameError: false,
        });
      }
    }
  };

  return (
    <Box>
      {showHomePage ? (
        navigate("/")
      ) : (
        <Box className={classes.box}>
          <Typography variant="h4" mb={'5px'}>Login</Typography>
          <form className="  " onSubmit={handleSubmit}>
            <Box width={320}>
              <Box className={classes.box2} >
                <TextField
                  id="outlined-basic"
                  autoComplete="off"
                  onChange={userNameHandler}
                  label="UserName"
                  variant="outlined"
                  fullWidth
                />
                {loginState.emptyusernameError ? (
                  <Typography className={classes.loginError} 
                  data-testid="fail">please enter username</Typography>
                ) : loginState.usernameError ? (
                  <Typography className={classes.loginError} data-testid="fail2">
                    username should be alphanumeric only
                  </Typography>
                ) : loginState.loginError2 ? (
                  <Typography className={classes.loginError} data-testid="fail3">username is invalid</Typography>
                ) : (
                  ""
                )}
              </Box>
              <Box mb={'10px'}>
                <TextField
                  id="password-input"
                  type="password"
                  autoComplete="off"
                  onChange={passwordHandler}
                  label="Password"
                  variant="outlined"
                  fullWidth
                />
                {loginState.emptypasswordError ? (
                  <Typography className={classes.loginError} data-testid="fail4">please enter password</Typography>
                ) : (
                  ""
                )}
                {loginState.loginError && (
                  <Typography className={classes.loginError} data-testid="fail5">
                    password is invalid.
                  </Typography>
                )}
              </Box>
            </Box>
            <Box className={classes.loginButton}>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Box>
          </form>
          <Link to='/registration'><Typography variant="h6" className={classes.registertext}>Register</Typography></Link>
        </Box>
      )}
    </Box>
  );
};

export default Login;