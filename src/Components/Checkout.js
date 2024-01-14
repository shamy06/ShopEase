import React, {useState} from "react";
import { Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { countryData } from "./ProductData";
import Toast from "./Toast";
import "../Component.css";
import { AdrressCard } from "./Util/CommonComponets";

const Checkout = () => {
  const email_Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const mobile_Regex = /^\d{10}$/;
  const addressData = JSON.parse(localStorage.getItem("userData") || "[]");
  const loginUsername = localStorage.getItem("signUp");
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

  const loggedUserDetails=addressData.find((item)=>item.userName===loginUsername);
  const availableState = countryData.countries.find((c) => c.name === checkoutState2.selectedCountry);
  const availableCities = availableState?.states?.find((s) => s.name === checkoutState2.selectedState);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
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
            emailError: "email should contain @ and . in it",
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
             mobileError: false 
            });
        } else {
          setCheckoutState2({
            ...checkoutState2,
            mobileError: "mobile number should be numeric and 10 digits",
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
    if (id === "country") {
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
    if (id === "state") {
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
    if (id === "city") {
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
        const {name,emailId,mobile}=loggedUserDetails;
        setCheckoutState2({
          ...checkoutState2,
          fullName: name,
          emailId: emailId,
        });
        if ( loggedUserDetails.address?.length> 0) {
          const recentAddress = loggedUserDetails.address.slice(-1)[0];
          const {City,Country,State,Address1,Address2,Pincode}=recentAddress;
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
    } else if (!checkoutState2?.pinCode) {
      setCheckoutState2({
        ...checkoutState2,
        pinCodeError: "please enter pincode",
      });
    } else {
      Toast("Address Saved Successfully", "success");
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
    <div>
      <h5 className="chckoutHeading">Delivery Address</h5>
      {checkoutState.showaddress ? (
            loggedUserDetails.address.length>0?(
              <div className= "card" id="saveAddressCard">
                <div className="addressEdit" onClick={handleNewAddress}>
                  <FaRegEdit />
                </div>
                <AdrressCard addressCard={loggedUserDetails}/>
              </div>
            ) : (
              <div className="addNewAddress" onClick={handleNewAddress}>
                Add Address
              </div>
            )        
      ) : (
        <div className="row" id="checkoutRow">
          {checkoutState.saveButton ? (
            <div className= "card" id="saveAddressCard">
              <div className="addressEdit" onClick={handleNewAddress}>
                <FaRegEdit />
              </div>              
              <AdrressCard addressCard={loggedUserDetails}/>
            </div>
          ) : (
            <div className="card" id="formCard">
              <p id="helpMsg">
                Fields marked with (<span>*</span> ) are mandatory
              </p>
              <form className="checkoutBody" onSubmit={saveAddress}>
                <div className="checkout-key">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    autoComplete="off"
                    defaultValue={checkoutState2.fullName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <span className="checkoutErrorMsg">
                  {checkoutState2.fullNameError}
                </span>
                <div className="checkout-key">
                  <label htmlFor="mobile">Mobile No</label>
                  <input
                    type="text"
                    id="mobile"
                    autoComplete="off"
                    defaultValue={checkoutState2.mobile}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <span className="checkoutErrorMsg">
                  {checkoutState2.mobileError}
                </span>
                <div className="checkout-key">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="emailId"
                    autoComplete="off"
                    defaultValue={checkoutState2.emailId}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <span className="checkoutErrorMsg">
                  {checkoutState2.emailError}
                </span>
                <div>
                  <div className="checkout-key">
                    <label htmlFor="address1">Address1</label>
                    <input
                      type="text"
                      id="address1"
                      autoComplete="off"
                      defaultValue={checkoutState2.addressOne}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <span className="checkoutErrorMsg">
                    {checkoutState2.addressOneError}
                  </span>
                  <div className="address2-key">
                    <label htmlFor="address2">Address2</label>
                    <input
                      type="text"
                      id="address2"
                      autoComplete="off"
                      defaultValue={checkoutState2.addressTwo}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div className="country-container">
                  <label htmlFor="country">Country</label>
                      <select
                        placeholder="Country"
                        value={checkoutState2.selectedCountry}
                        id="country"
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option>--Choose Country--</option>
                        {countryData.countries.map((value, key) => {
                          return (
                            <option value={value.name} key={key}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>
                      <span className="countryErrorMsg">
                        {checkoutState2.selectedCountryError}
                      </span>
                        </div>
                    <div className="state-container">
                      <label htmlFor="state">State</label>
                      <select
                        placeholder="State"
                        value={checkoutState2.selectedState}
                        id="state"
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option>--Choose State--</option>
                        {availableState?.states.map((e, key) => {
                          return (
                            <option value={e.name} key={key}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                      <span className="stateErrorMsg">
                        {checkoutState2.selectedStateError}
                      </span>
                    </div>
                  <div className="city-container">
                        <label htmlFor="city">City</label>
                        <select
                          placeholder="City"
                          value={checkoutState2.selectedCity}
                          id="city"
                          onChange={(e) => handleInputChange(e)}
                        >
                          <option>--Choose City--</option>
                          {availableCities?.cities.map((e, key) => {
                            return (
                              <option value={e.name} key={key}>
                                {e}
                              </option>
                            );
                          })}
                        </select>
                        <span className="countryErrorMsg">
                          {checkoutState2.selectedCityError}
                        </span>
                        </div>
                        <div className="pincode-container">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                          type="text"
                          id="pincode"
                          autoComplete="off"
                          onChange={(e) => handleInputChange(e)}
                          defaultValue={checkoutState2.pinCode}
                        />
                      </div>
                    <span className="pinCodeErrorMsg">
                      {checkoutState2.pinCodeError}
                    </span>
                  </div>
                <div className="addressButton1">
                <Button className="addressButton" type="submit">
                  Save
                </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;