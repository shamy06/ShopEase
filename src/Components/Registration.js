import { Box, Button, FormLabel, OutlinedInput, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
import "../Component.css";

const password_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const email_Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const username_Regex = /^(?=.{0,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

const Registration = () => {
  const [registrationState, setRegistrationState] = useState({
    name: null,
    userName: null,
    email: null,
    password: null,
    confirmPassword: null,
    nameError:false,
    userNameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    emptyNameError: false,
    emptyuserNameError: false,
    emptyEmailError: false,
    emptyPasswordError: false,
    emptyConfirmPasswordError: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      if (value.length === 0) {
        setRegistrationState({
          ...registrationState,
          nameError: false,
          emptyNameError: true,
        });
      } else {
        setRegistrationState({
          ...registrationState,
          name: value,
          nameError: false,
          emptyNameError: false,
        });
      }
    }
    if (id === "userName") {
      if (username_Regex.test(value)) {
        setRegistrationState({
          ...registrationState,
          userName: value,
          userNameError: false,
          emptyuserNameError: false,
        });
      } else {
        if (value.length === 0) {
          setRegistrationState({
            ...registrationState,
            userNameError: false,
            emptyuserNameError: true,
          });
        } else {
          setRegistrationState({
            ...registrationState,
            userNameError: true,
            emptyuserNameError: false,
          });
        }
      }
    }
    if (id === "email") {
      if (email_Regex.test(value)) {
        setRegistrationState({
          ...registrationState,
          email: value,
          emailError: false,
          emptyEmailError: false,
        });
      } else {
        if (value.length === 0) {
          setRegistrationState({
            ...registrationState,
            emailError: false,
            emptyEmailError: true,
          });
        } else {
          setRegistrationState({
            ...registrationState,
            emailError: true,
            emptyEmailError: false,
          });
        }
      }
    }
    if (id === "password") {
      if (password_Regex.test(value)) {
        setRegistrationState({
          ...registrationState,
          password: value,
          passwordError: false,
          emptyPasswordError: false,
        });
      } else {
        if (value.length === 0) {
          setRegistrationState({
            ...registrationState,
            emptyPasswordError: true,
            passwordError: false,
          });
        } else {
          setRegistrationState({
            ...registrationState,
            passwordError: true,
            emptyPasswordError: false,
          });
        }
      }
    }
    if (id === "confirmPassword") {
      if (value === registrationState.password) {
        setRegistrationState({
          ...registrationState,
          confirmPassword: value,
          confirmPasswordError: false,
          emptyConfirmPasswordError: false,
        });
      } else {
        if (value.length === 0) {
          setRegistrationState({
            ...registrationState,
            emptyConfirmPasswordError: true,
            confirmPasswordError: false,
          });
        } else {
          setRegistrationState({
            ...registrationState,
            emptyConfirmPasswordError: false,
            confirmPasswordError: true,
          });
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registrationState?.name ) {
      setRegistrationState({ ...registrationState, emptyNameError: true });    }
     else if (!registrationState?.userName) {
      setRegistrationState({ ...registrationState, emptyuserNameError: true });
    } else if (!registrationState?.email) {
      setRegistrationState({ ...registrationState, emptyEmailError: true });
    } else if (!registrationState?.password) {
      setRegistrationState({ ...registrationState, emptyPasswordError: true });
    } else if (!registrationState?.confirmPassword) {
      setRegistrationState({
        ...registrationState,
        emptyConfirmPasswordError: true,
      });
    } else {
      if (
        registrationState?.nameError ||
        registrationState?.emailError ||
        registrationState?.userNameError ||
        registrationState?.passwordError ||
        registrationState?.confirmPasswordError||
        registrationState?.emptyConfirmPasswordError
      ) {
        setRegistrationState({ ...registrationState });
      } else {
        if (localStorage.getItem("username") === registrationState.userName) {
          Toast("Account Already Exist !!", "info");
        } else {
          var userData = JSON.parse(localStorage.getItem("userData") || "[]");
          var userdata = {
            userName: registrationState.userName,
            password: registrationState.password,
            wishListId:[],
            cartListId:[],
            recentProductId: [],
            address: [],
            name: registrationState.name,
            emailId: registrationState.email,
          };
          userData.push(userdata);
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("signUp", registrationState.userName);
          Toast("Account Created Successfully!!", "success");
          navigate("/");
        }
      }
    }
  };

  return (
    <div className="registraion">
      <h1>Create Account</h1>
      <p> Fields marked with (<span>*</span> ) are mandatory</p>
      <form className="registration-body" onSubmit={handleSubmit}>
        <Box width={590}  
       >
        <div className="registration-key">
          <FormLabel  sx={{
                    mr:"10px",
                    display: "flex",
                    width:"30%",
                    color:"black",
                    alignItems:"center"
                }}>Full Name</FormLabel>
          <TextField  fullWidth id="name" label="FullName" autoComplete="off" onChange={handleInputChange}  variant="outlined" size="small"/>
        </div>
        {registrationState.emptyNameError ? (
          <span className="registrationErrorMsg">please enter name</span>
        ) : (
          ""
        )}
        <div className="registration-key">
          <FormLabel  sx={{
                    mr:"10px",
                    display: "flex",
                    width:"30%",
                    color:"black",
                    alignItems:"center"
                }}>User Name</FormLabel>
          <TextField  fullWidth margin="dense" id="userName" label="UserName" autoComplete="off" onChange={handleInputChange}  variant="outlined" size="small"/>
        </div>
        {registrationState.userNameError ? (
          <span className="registrationErrorMsg">
            username should be alphanumeric only
          </span>
        ) : (
          ""
        )}
        {registrationState.emptyuserNameError ? (
          <span className="registrationErrorMsg">please enter username</span>
        ) : (
          ""
        )}
        <div className="registration-key">
          <FormLabel  sx={{
                    mr:"10px",
                    display: "flex",
                    width:"30%",
                    color:"black",
                    alignItems:"center"
                }}>Email</FormLabel>
          <TextField fullWidth id="email" margin="dense" type="text" label="Email" autoComplete="off" onChange={handleInputChange}  variant="outlined" size="small"/>
        </div>
        {registrationState.emailError ? (
          <span className="registrationErrorMsg">
            email should contain @ and . in it
          </span>
        ) : (
          ""
        )}
        {registrationState.emptyEmailError ? (
          <span className="registrationErrorMsg">please enter email</span>
        ) : (
          ""
        )}
        <div className="registration-key">
          <FormLabel  sx={{
                    mr:"10px",
                    display: "flex",
                    width:"30%",
                    color:"black",
                    alignItems:"center"
                }}>Password</FormLabel>
          <TextField fullWidth id="password" margin="dense" type="password" placeholder="password" label="Password" autoComplete="off" onChange={handleInputChange}  variant="outlined" size="small"/>
        </div>
        {registrationState.passwordError ? (
          <span className="registrationErrorMsg">
            password standards should be followed(ex:Ab@1)
          </span>
        ) : (
          ""
        )}
        {registrationState.emptyPasswordError ? (
          <span className="registrationErrorMsg">please enter password</span>
        ) : (
          ""
        )}
        <div className="registration-key">
          <FormLabel  sx={{
                    mr:"10px",
                    display: "flex",
                    width:"30%",
                    color:"black",
                    alignItems:"center"
                }}>Confirm Password</FormLabel>
          <TextField fullWidth id="confirmPassword" margin="dense" type="password" placeholder="confirmPassword" label="ConfirmPassword" autoComplete="off" onChange={handleInputChange}  variant="outlined" size="small"/>
        </div>
        {registrationState.confirmPasswordError ? (
          <span className="registrationErrorMsg">password does not match</span>
        ) : (
          ""
        )}
        {registrationState.emptyConfirmPasswordError ? (
          <span className="registrationErrorMsg">
            please enter confirmPassword
          </span>
        ) : (
          ""
        )}
        </Box>
        <Box      
            m={2}     
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Button variant="contained" type="submit" >Register</Button>
            </Box>
      </form>
    </div>
  );
};

export default Registration;