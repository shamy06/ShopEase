import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { useSnackBar } from "./cartContext";
import { useRegistrationStyles } from "./Util/MuiStyles";

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
    nameError: false,
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
  const { addSnackbarItem } = useSnackBar();
  const classes = useRegistrationStyles();

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
    if (!registrationState?.name) {
      setRegistrationState({ ...registrationState, emptyNameError: true });
    }
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
        registrationState?.confirmPasswordError ||
        registrationState?.emptyConfirmPasswordError
      ) {
        setRegistrationState({ ...registrationState });
      } else {
        if (localStorage.getItem("username") === registrationState.userName) {
          addSnackbarItem(true,"Account Already Exist !!","info");
        } else {
          var userData = JSON.parse(localStorage.getItem("userData") || "[]");
          var userdata = {
            userName: registrationState.userName,
            password: registrationState.password,
            wishListId: [],
            cartListId: [],
            recentProductId: [],
            address: [],
            name: registrationState.name,
            emailId: registrationState.email,
          };
          userData.push(userdata);
        //   axios.post("http://localhost:8081/user/register",
        // {
        // fullName: registrationState.name,
        // userName : registrationState.userName,
        // email : registrationState.email,
        // password:registrationState.password,
        // confirmPassword:registrationState.confirmPassword        
        // });
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("signUp", registrationState.userName);
          addSnackbarItem(true,"Account Created Successfully !!","success");
          navigate("/");
        }
      }
    }
  };

  return (
    <Box className={classes.box}>
      <Typography variant="h4">Create Account</Typography>
      <Typography className={classes.typographyOne} > Fields marked with (<Box className={classes.color}>*</Box> ) are mandatory</Typography>
      <form className="registration-body" onSubmit={handleSubmit}>
        <Box className={classes.mainBox} sx={{width: { lg: 500, xs: 300, sm: 450, md: 500 } }}>
          <Box className={classes.filedBox}>
            <FormLabel className={classes.formlabel}
            >Full Name<Box className={classes.color}>*</Box></FormLabel>
            <TextField fullWidth id="name" label="FullName" autoComplete="off" onChange={handleInputChange} variant="outlined" sx={{mt:1}}/>
          </Box>
          {registrationState.emptyNameError ? (
            <Typography className={classes.error} data-Testid="Registraion_fail">please enter name</Typography>
          ) : (
            ""
          )}
          <Box className={classes.filedBox}>
            <FormLabel className={classes.formlabel}>User Name<Box className={classes.color}>*</Box></FormLabel>
            <TextField fullWidth margin='dense' id="userName" label="UserName" autoComplete="off" onChange={handleInputChange} variant="outlined" />
          </Box>
          {registrationState.userNameError ? (
            <Typography className={classes.error} data-Testid="Registraion_fail2">
              username should be alphanumeric only
            </Typography>
          ) : (
            ""
          )}
          {registrationState.emptyuserNameError ? (
            <Typography className={classes.error} data-Testid="Registraion_fail3">please enter username</Typography>
          ) : (
            ""
          )}
          <Box className={classes.filedBox}>
            <FormLabel className={classes.formlabel}>Email<Box className={classes.color}>*</Box></FormLabel>
            <TextField fullWidth id="email" margin="dense" type="text" label="Email" autoComplete="off" onChange={handleInputChange} variant="outlined" />
          </Box>
          {registrationState.emailError ? (
            <Typography className={classes.error} data-Testid="Registraion_fail4">
              email should contain @ and . in it
            </Typography>
          ) : (
            ""
          )}
          {registrationState.emptyEmailError ? (
            <Typography className={classes.error} data-Testid="Registraion_fail5">please enter email</Typography>
          ) : (
            ""
          )}
          <Box className={classes.filedBox}>
            <FormLabel className={classes.formlabel}>Password<Box className={classes.color}>*</Box></FormLabel>
            <TextField fullWidth id="password" margin="dense" type="password" label="Password" autoComplete="off" onChange={handleInputChange} variant="outlined" />
          </Box>
          {registrationState.passwordError ? (
            <Typography className={classes.error} data-Testid="Registraion_fail6">
              password should be followed(ex:Ab@1)
            </Typography>
          ) : (
            ""
          )}
          {registrationState.emptyPasswordError ? (
            <Typography className={classes.error} data-Testid="Registraion_fail7">please enter password</Typography>
          ) : (
            ""
          )}
          <Box className={classes.filedBox} >
            <FormLabel className={classes.formlabel}>Confirm Password<Box className={classes.color}>*</Box></FormLabel>
            <TextField fullWidth id="confirmPassword" margin="dense" type="password" label="ConfirmPassword" autoComplete="off" onChange={handleInputChange} variant="outlined" />
          </Box>
          {registrationState.confirmPasswordError ? (
            <Typography className={classes.error} data-Testid="Registraion_fail8">password does not match</Typography>
          ) : (
            ""
          )}
          {registrationState.emptyConfirmPasswordError ? (
            <Typography className={classes.error}>
              please enter confirmPassword
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <Box className={classes.buttonBox} >
          <Button variant="contained" type="submit" >Register</Button>
        </Box>
      </form>
    </Box>
  );
};

export default Registration;