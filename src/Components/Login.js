import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import { Box, Button, TextField } from "@mui/material";
import "../Component.css";

const baseURL =
  "https://my-json-server.typicode.com/shamy06/MOCK_USER_API/Users";

const Login = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
    emptypasswordError: false,
    emptyusernameError: false,
    usernameError: false,
    loginError: false,
    apiUserData:""
  });
  
  const [showHomePage,setshowHomePage]=useState(false);
  const localSignUp = localStorage.getItem("signUp");
  const navigate = useNavigate();
  const username_Regex =/^(?=.{0,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

  useEffect(() => {
    if (localSignUp) {
      setLoginState({ ...loginState });
      setshowHomePage(true);
    }
    axios.get(`${baseURL}`).then((response) => {
      setLoginState({ ...loginState, apiUserData:response.data})
    });
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

    const apiUser = loginState.apiUserData.find(
      (user) =>
        user.userName === loginState.username &&
        user.password === loginState.password
    );

    if (apiUser || userlogin.length > 0) {
      setLoginState({ ...loginState });
      setshowHomePage(true);
      localStorage.setItem("signUp", loginState.username);
      if (apiUser) {
        userdata.push(apiUser);
        localStorage.setItem("userData", JSON.stringify(userdata));
      }
      Toast("LoggedIn Successfully", "success");      
    } else {
      if (loginState?.username.length === 0) {
        setLoginState({ ...loginState, emptyusernameError: true });
      } else if (loginState?.password.length === 0) {
        setLoginState({ ...loginState, emptypasswordError: true });
      } else {
        setLoginState({
          ...loginState,
          loginError: true,
          emptypasswordError: false,
          emptyusernameError: false,
        });
      }
    }
  };
  const ariaLabel = { 'aria-label': 'description' };

  return (
    <div>
      {showHomePage ? (
        navigate("/")
      ) : (
        <div className="login">
          <h1>Login</h1>
          <form className="  " onSubmit={handleSubmit}>
            <Box width={320}>
            <div className="textField">
            {/* <input
              type="text"
              placeholder="UserName"
              name="username"
              autoComplete="off"
              onChange={userNameHandler}
            /> */}
            {/* <Input defaultValue="Hello world" inputProps={ariaLabel} border /> */}
            <TextField  id="outlined-basic" autoComplete="off" onChange={userNameHandler} label="UserName" variant="outlined" size="small" />
            {loginState.emptyusernameError ? (
              <span className="loginErrorMsg">please enter username</span>
            ) : loginState.usernameError ? (
              <span className="loginErrorMsg">
                username should be alphanumeric only
              </span>
            ) : (
              ""
            )}
            </div>
            {/* <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              onChange={passwordHandler}
            /> */}
            <div className="textField">
            <TextField   id="outlined-basic" type="password" autoComplete="off" onChange={passwordHandler} label="Password" variant="outlined" size="small"/>
            {loginState.emptypasswordError ? (
              <span className="loginErrorMsg">please enter password</span>
            ) : (
              ""
            )}
            {loginState.loginError && (
              <span className="loginErrorMsg">
                username or password is invalid.
              </span>
            )}
            </div>
            </Box>
            {/* <button className="submit_btn">Submit</button> */}
            <Box           
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Button variant="contained" type="submit" >Login</Button>
            </Box>
          </form>
          {/* <NavLink to={"/registration"}>
            <h4>Register</h4>
          </NavLink> */}
        </div>
      )}
    </div>
  );
};

export default Login;