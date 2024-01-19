
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdrressCard } from "./RatingsAndAddressCard";
import { useSnackBar } from "./cartContext";
import usecheckoutStyle from "./Util/useCheckoutStyles";
import {countryData} from "./Util/ProductData";

const Checkout = () => {
  const email_Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const mobile_Regex = /^\d{10}$/;
  const addressData = JSON.parse(localStorage.getItem("userData") || "[]");
  const loginUsername = localStorage.getItem("signUp");
  const classes = usecheckoutStyle();
  const { addSnackbarItem } = useSnackBar();
  const [checkoutState, setCheckoutState] = useState({
    showaddress: true,
    saveButton: false,
  });
  const [checkoutState2, setCheckoutState2] = useState({
    selectedCountry: null,
    selectedState: null,
    selectedCity: null,
    pinCode: null,
    fullName: null,
    emailId: null,
    mobile: null,
    addressOne: null,
    addressTwo: null,
    fullNameError: false,
    emailError: false,
    mobileError: false,
    addressOneError: false,
    selectedCityError: false,
    selectedCountryError: false,
    selectedStateError: false,
    pinCodeError: false,
  });

  const loggedUserDetails = addressData.find(
    (item) => item.userName === loginUsername
  );
  const availableState = countryData.countries.find(
    (c) => c.name === checkoutState2.selectedCountry
  );
  const availableCities = availableState?.states?.find(
    (s) => s.name === checkoutState2.selectedState
  );

  const handleInputChange = (e) => {
    const { id, value, name } = e.target;
    if (id === "fullName") {
      setCheckoutState2({
        ...checkoutState2,
        fullName: value,
        fullNameError: false,
      });
    }
    if (id === "emailId") {
      if (email_Regex.test(value)) {
        setCheckoutState2({
          ...checkoutState2,
          emailId: value,
          emailError: false,
        });
      } else {
        if (value.length === 0) {
          setCheckoutState2({
            ...checkoutState2,
            emailId: null,
            emailError: false,
          });
        } else {
          setCheckoutState2({
            ...checkoutState2,
            emailError: "email should have @ and . in it",
          });
        }
      }
    }
    if (id === "mobile") {
      if (mobile_Regex.test(value)) {
        setCheckoutState2({
          ...checkoutState2,
          mobile: value,
          mobileError: false,
        });
      } else {
        if (value.length === 0) {
          setCheckoutState2({
            ...checkoutState2,
            mobile: null,
            mobileError: false,
          });
        } else {
          setCheckoutState2({
            ...checkoutState2,
            mobileError: "only numeric and 10 digits",
          });
        }
      }
    }
    if (id === "address1") {
      setCheckoutState2({
        ...checkoutState2,
        addressOne: value,
        addressOneError: false,
      });
    }
    if (id === "address2") {
      setCheckoutState2({ ...checkoutState2, addressTwo: value });
    }
    if (name === "country") {
      if (value != null) {
        setCheckoutState2({
          ...checkoutState2,
          selectedCountry: value,
          selectedCountryError: false,
        });
      } else {
        setCheckoutState2({
          ...checkoutState2,
          selectedState: null,
          selectedCity: null,
          selectedCountry: null,
        });
      }
    }
    if (name === "state") {
      if (value != null) {
        setCheckoutState2({
          ...checkoutState2,
          selectedState: value,
          selectedStateError: false,
        });
      } else {
        setCheckoutState2({ ...checkoutState2, selectedState: null });
      }
    }
    if (name === "city") {
      if (value != null) {
        setCheckoutState2({
          ...checkoutState2,
          selectedCity: value,
          selectedCityError: false,
        });
      } else {
        setCheckoutState2({ ...checkoutState2, selectedCity: null });
      }
    }
    if (id === "pincode") {
      setCheckoutState2({
        ...checkoutState2,
        pinCode: value,
        pinCodeError: false,
      });
    }
  };

  const handleNewAddress = () => {
    const { name, emailId, mobile } = loggedUserDetails;
    setCheckoutState2({
      ...checkoutState2,
      fullName: name,
      emailId: emailId,
    });
    if (loggedUserDetails.address?.length > 0) {
      const recentAddress = loggedUserDetails.address.slice(-1)[0];
      const { City, Country, State, Address1, Address2, Pincode } =
        recentAddress;
      setCheckoutState2({
        ...checkoutState2,
        fullName: name,
        emailId: emailId,
        mobile: mobile,
        selectedCity: City,
        selectedCountry: Country,
        selectedState: State,
        pinCode: Pincode,
        addressOne: Address1,
        addressTwo: Address2,
      });
    }
    setCheckoutState({
      ...checkoutState,
      saveButton: false,
      showaddress: false,
    });
  };

  const saveAddress = (e) => {
    e.preventDefault();
    const {
      fullName,
      mobile,
      emailId,
      addressOne,
      selectedCountry,
      selectedState,
      selectedCity,
      pinCode,
      addressTwo,
    } = checkoutState2;
    if (!checkoutState2?.fullName) {
      setCheckoutState2({
        ...checkoutState2,
        fullNameError: "please enter name",
      });
    } else if (!checkoutState2?.mobile) {
      setCheckoutState2({
        ...checkoutState2,
        mobileError: "please enter mobile",
      });
    } else if (!checkoutState2?.emailId) {
      setCheckoutState2({
        ...checkoutState2,
        emailError: "please enter email",
      });
    } else if (!checkoutState2?.pinCode) {
      setCheckoutState2({
        ...checkoutState2,
        pinCodeError: "please enter pincode",
      });
    } else if (!checkoutState2?.addressOne) {
      setCheckoutState2({
        ...checkoutState2,
        addressOneError: "please enter address",
      });
    } else if (!checkoutState2?.selectedCountry) {
      setCheckoutState2({
        ...checkoutState2,
        selectedCountryError: "please choose country",
      });
    } else if (!checkoutState2?.selectedState) {
      setCheckoutState2({
        ...checkoutState2,
        selectedStateError: "please choose state",
      });
    } else if (!checkoutState2?.selectedCity) {
      setCheckoutState2({
        ...checkoutState2,
        selectedCityError: "please choose city",
      });
    } else {
      addSnackbarItem(true, "Address Saved Successfully", "success");
      var userAddress = {
        Address1: addressOne,
        Address2: addressTwo,
        Country: selectedCountry,
        State: selectedState,
        City: selectedCity,
        Pincode: pinCode,
      };
      setCheckoutState({ ...checkoutState, saveButton: true });
      const elements = addressData.map((productItem) => {
        if (productItem.userName === loginUsername) {
          productItem["address"].push(userAddress);
          productItem["mobile"] = mobile;
          productItem["name"] = fullName;
          productItem["emailId"] = emailId;
        }
      });
      localStorage.setItem("userData", JSON.stringify(addressData));
    }
  };

  return (
    <Box>
      <Typography variant="h5" className={classes.typographyHeading}>
        Delivery Address
      </Typography>
      {checkoutState.showaddress ? (
        loggedUserDetails?.address.length > 0 ? (
          <Card
            variant="outlined" className={classes.card}
          >
            <Box className={classes.editBox}
            >
              <EditIcon color="black" onClick={handleNewAddress} />
            </Box>
            <AdrressCard addressCard={loggedUserDetails} />
          </Card>
        ) : (
          <Box className={classes.addAddressBox}
            onClick={handleNewAddress}
          >
            Add Address
          </Box>
        )
      ) : (
        <Box>
          {checkoutState.saveButton ? (
            <Card
              variant="outlined" className={classes.card}
            >
              <Box className={classes.editBox}
              >
                <EditIcon color="black" onClick={handleNewAddress} />
              </Box>
              <AdrressCard addressCard={loggedUserDetails} />
            </Card>
          ) : (
            <Card
              variant="outlined" className={classes.card}
            >
              <Typography className={classes.typographyOne}
              >
                Fields marked with (
                <Box className={classes.color}>*</Box> ) are
                mandatory
              </Typography>
              <form className="checkoutBody" onSubmit={saveAddress}>
                <Grid container columnSpacing={2} ml={3}>
                  <Grid item lg={6} xs={12}>
                    <FormLabel
                      className={classes.label}
                    >
                      Full Name<Box className={classes.color}>*</Box>
                    </FormLabel>
                    <TextField
                      sx={{ width: "50%" }}
                      size="small"
                      margin="dense"
                      id="fullName"
                      label="FullName"
                      defaultValue={checkoutState2.fullName}
                      autoComplete="off"
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                    />
                    <Typography className={classes.errorMsgOne} >
                      {checkoutState2.fullNameError}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <FormLabel className={classes.label2}
                    >
                      Mobile No<Box className={classes.color}>*</Box>
                    </FormLabel>
                    <TextField
                      sx={{ width: { lg: "48%", xs: "50%" } }}
                      size="small"
                      margin="dense"
                      id="mobile"
                      label="Mobile No"
                      autoComplete="off"
                      defaultValue={checkoutState2.mobile}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                    />
                    <Typography className={classes.errorMsgTwo}>
                      {checkoutState2.mobileError}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <FormLabel
                      className={classes.label}
                    >
                      Email<Box className={classes.color}>*</Box>
                    </FormLabel>
                    <TextField
                      sx={{ width: { lg: "50%", xs: "50%" } }}
                      margin="dense"
                      size="small"
                      id="emailId"
                      label="Email Id"
                      autoComplete="off"
                      defaultValue={checkoutState2.emailId}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                    />
                    <Typography className={classes.errorMsgOne} >
                      {checkoutState2.emailError}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <FormLabel className={classes.label2}
                    >
                      Pincode<Box className={classes.color}>*</Box>
                    </FormLabel>
                    <TextField
                      sx={{ width: { lg: "48%", xs: "50%" } }}
                      margin="dense"
                      size="small"
                      id="pincode"
                      label="Pincode"
                      autoComplete="off"
                      defaultValue={checkoutState2.pinCode}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                    />
                    <Typography className={classes.errorMsgTwo}>
                      {checkoutState2.pinCodeError}
                    </Typography>
                  </Grid>
                  <Grid item lg={10.5} xs={12} width={600}>
                    <FormLabel
                      sx={{
                        width: { lg: "12.5%", xs: "28%" },
                        mt: 2,
                        display: "inline-flex",
                      }}
                    >
                      Address<Box className={classes.color}>*</Box>
                    </FormLabel>
                    <TextField
                      sx={{ width: { lg: "82%", xs: "50%" } }}
                      margin="dense"
                      id="address1"
                      label="Address1"
                      autoComplete="off"
                      defaultValue={checkoutState2.addressOne}
                      onChange={(e) => handleInputChange(e)}
                      variant="outlined"
                    />
                    <Typography className={classes.errorMsgOne}>
                      {checkoutState2.addressOneError}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xl={8}
                    lg={6}
                    xs={12}
                    md={12}
                    width={400}
                    size="small"
                  >
                    <FormLabel variant="standard" className={classes.lable3}
                    >
                      Country<Box className={classes.color}>*</Box>
                    </FormLabel>
                    <FormControl
                      variant="standard" className={classes.formControl}
                    >
                      <InputLabel className={classes.formControl2} id="demo-simple-select-standard-label">
                        Select Country
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={checkoutState2.selectedCountry}
                        label="Country"
                        name="country"
                        onChange={(e) => handleInputChange(e)}
                      >
                        {countryData.countries?.map((countryvalue) => {
                          return (
                            <MenuItem value={countryvalue.name}>
                              {countryvalue.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <Typography className={classes.color}>
                        {checkoutState2.selectedCountryError}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xl={6} lg={6} xs={12} width={300}>
                    <FormLabel
                      variant="standard"
                      sx={{
                        width: { lg: "21%", xs: "26%", sm: "27%" },
                        color: "balck",
                        display: 'inline-flex',
                        mt: 3,
                        ml: { lg: 0, xs: 0 },
                        mr: { lg: 0, xs: 0 },
                      }}
                    >
                      State<Box className={classes.color}>*</Box>
                    </FormLabel>
                    <FormControl
                      variant="standard" className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Select State
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={checkoutState2.selectedState}
                        label="State"
                        name="state"
                        onChange={(e) => handleInputChange(e)}
                      >
                        {availableState?.states.map((stateValue) => {
                          return (
                            <MenuItem value={stateValue.name}>
                              {stateValue.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <Typography className={classes.color}>
                        {checkoutState2.selectedStateError}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} lg={6} xl={6} sx={6} width={389}>
                    <FormLabel
                      variant="standard"
                      className={classes.lable3}
                    >
                      City<Box className={classes.color}>*</Box>
                    </FormLabel>
                    <FormControl
                      variant="standard" className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Select City
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={checkoutState2.selectedCity}
                        label="city"
                        name="city"
                        onChange={(e) => handleInputChange(e)}
                      >
                        {availableCities?.cities.map((cityValue) => {
                          return (
                            <MenuItem value={cityValue}>{cityValue}</MenuItem>
                          );
                        })}
                      </Select>
                      <Typography className={classes.color}>
                        {checkoutState2.selectedCityError}
                      </Typography>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box className={classes.save}
                >
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </Box>
              </form>
            </Card>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Checkout;