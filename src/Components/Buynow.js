import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { deleteBuynowProduct, datalistDispatch } from "../Redux/Action/ProductAction";
import { AiFillDelete as Delete} from "react-icons/ai";
import AddtoWishList from "./AddToWishList";
import { numberFormat, Offers } from "./PriceFormat";
import Checkout from "./Checkout";
import Toast from "./Toast";
import "../Component.css";

const Buynow = ({search, buynow, wishList }) => {
  const [buynowState, setBuynowState] = useState({
    totalPrice: 0,
    totalOrder: 0,
    formatedPrice: 0,
    quantity: 0,
    discountedVlaue: 0,
    couponValidation: false,
    invalidCouponCode: 0,
    couponCodeMsg: "",
    couponCode: "",
    offer1: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearSearch = () => {
    dispatch(datalistDispatch(""));
  };

  const buynowTotalprice = () => {
    let totalprice = 0;
    buynow.map((item) => {
      totalprice = Math.round(
        ((item.price * item.qnty + totalprice) * 100) / 100
      );
    });
    setBuynowState({
      ...buynowState,
      formatedPrice: totalprice + 80,
      totalPrice: numberFormat(totalprice),
      totalOrder: buynowState.formatedPrice,
      invalidCouponCode: false,
    });
    if (buynowState.couponValidation && !buynowState.invalidCouponCode) {
      if (buynowState.formatedPrice < 999 && !buynowState.offer1) {
        setBuynowState({
          ...buynowState,
          couponValidation: false,
          offer1: false,
          discountedVlaue: 0,
        });
      } else if (buynowState.formatedPrice < 499) {
        setBuynowState({
          ...buynowState,
          couponValidation: false,
          discountedVlaue: 0,
        });
      } else {
        if (buynowState.couponValidation) applyCode();
      }
    }
  };
  
  const placeOrder = () => {
    navigate("/placeorder");
  };

  useEffect(() => {
    buynowTotalprice();
  }, [buynowState.quantity, buynowState.totalPrice, buynow.discountedVlaue]);

  const increase = (item) => {
    item.qnty += 1;
    setBuynowState({ ...buynowState, quantity: buynowState.quantity + 1 });
  };

  const decrease = (item) => {
    if (item.qnty > 1) {
      item.qnty -= 1;
      setBuynowState({ ...buynowState, quantity: buynowState.quantity - 1 });
    } else {
      setBuynowState({ ...buynowState, quantity: buynowState.quantity - 1 });
    }
  };

  const handelCoupon = (e) => {
    setBuynowState({ ...buynowState, coupon: e.target.value });
  };

  const removeCoupon = () => {
    setBuynowState({
      ...buynowState,
      couponValidation: false,
      discountedVlaue: 0,
      offer1: false,
      totalOrder: buynowState.formatedPrice,
    });
  };

  const applyCode = () => {
    switch (buynowState.coupon) {
      case "NEW200":
        if (buynowState.formatedPrice > 999) {
          let value1 = buynowState.formatedPrice - 200;
          setBuynowState({
            ...buynowState,
            discountedVlaue: 200,
            totalOrder: value1,
            couponValidation: true,
            invalidCouponCode: false,
          });
        } else {
          setBuynowState({
            ...buynowState,
            couponValidation: false,
            invalidCouponCode: false,
            couponCodeMsg: "The Coupon only for price above ₹999 only.",
          });
        }
        break;
      case "NEW20":
        if (buynowState.formatedPrice > 499) {
          let value2 = ((buynowState.formatedPrice - 80) * 20) / 100;
          setBuynowState({
            ...buynowState,
            discountedVlaue: value2,
            totalOrder: buynowState.formatedPrice - value2,
            couponValidation: true,
            invalidCouponCode: false,
            offer1: true,
          });
        } else {
          setBuynowState({
            ...buynowState,
            couponValidation: false,
            invalidCouponCode: false,
            couponCodeMsg: "The Coupon only for price above ₹499 only.",
          });
        }
        break;
      case "NEW5":
        if (buynowState.formatedPrice > 1599) {
          let value3 = ((buynowState.formatedPrice - 80) * 5) / 100;
          setBuynowState({
            ...buynowState,
            discountedVlaue: value3,
            totalOrder: buynowState.formatedPrice - value3,
            couponValidation: true,
            invalidCouponCode: false,
          });
        } else {
          setBuynowState({
            ...buynowState,
            couponValidation: false,
            invalidCouponCode: false,
            couponCodeMsg: "The Coupon only for price above ₹1,599 only.",
          });
        }
        break;
      default:
        setBuynowState({
          ...buynowState,
          couponValidation: false,
          invalidCouponCode: true,
        });
    }
  };

  if (buynow.length <= 0) {
    navigate("/");
  } else if (search.length>0){
    navigate("/")
            // <Search search={search} wishList={wishList} carts={carts} buynow={buynow} />
  }
  else{
    return (
      <div className="container" id="buynowContainer" onClick={clearSearch}>
        <h2 className="buynowHeading">
          Order Summary - {buynow.length}
          {buynow.length > 1 ? "items" : "item"}
        </h2>
        <div className="row" id="buynowColumn1">
          <div className="col col-8">
            <Checkout />
            <Offers />
            <div className="productorderbox">
              <div className="subBox">
                {buynow.map((item) => {
                  const {
                    image,
                    title,
                    subTitle,
                    price,
                    id,
                    qnty,
                    shortDescription,
                  } = item;
                  return (
                    <div key={id} className="buynowBorder">
                      <div className="buynowPrductSummary">
                        <div className="buynowImageBox">
                          <img
                            src={image}
                            alt={title}
                            className="buynowImages"
                          />
                        </div>
                        <div className="subContent">
                          <h2 className="subTitle">{subTitle}</h2>
                          <p className="buynowShortDecription">
                            {shortDescription}
                          </p>
                          <h3 className="subprice">{numberFormat(price)}</h3>
                          <span className="buynowQuantity">
                            Quantity
                            <Button
                              id={
                                qnty > 1
                                  ? "buynowquantity-Button"
                                  : "buynownonActive"
                              }
                              onClick={() => decrease(item)}
                            >
                              -
                            </Button>
                            {qnty}
                            <Button
                              id="buynowquantity-Button"
                              onClick={() => increase(item)}
                            >
                              +
                            </Button>
                          </span>
                          <span className="removeBuynowItem">
                            <Delete
                              fontSize="32px"
                              id="buynowItemDelete"
                              onClick={() => (
                                Toast(
                                  `${title} is removed successfully`,
                                  "success"
                                ),
                                dispatch(deleteBuynowProduct(id))
                              )}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="buynowWishlist">
                        <AddtoWishList
                          id={id}
                          title={title}
                          wishList={wishList}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col col-4" id="heightCol2">
            <div className="card" id="buynowColumn2">
              <Card.Body>
                {buynowState.couponValidation ? (
                  <div className="couponMsg">
                    Coupon code applied successfully
                    <span onClick={removeCoupon}> Remove</span>
                  </div>
                ) : (
                  <>
                    <div className="buynowCoupon">
                      <input
                        type="text"
                        placeholder="Have a Coupon / Referral"
                        onChange={handelCoupon}
                      />
                    </div>
                    <div className="applyCoupon" onClick={applyCode}>
                      Apply
                    </div>
                    {buynowState.invalidCouponCode ? (
                      <div className="couponErrorMsg">
                        The Coupon code is not valid.
                      </div>
                    ) : (
                      <div className="offerPriceMsg">
                        {buynowState.couponCodeMsg}
                      </div>
                    )}
                  </>
                )}
                <table>
                  <tbody>
                    <tr>
                      <th className="tableHeadingRow">Price Details</th>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td className="tableValues">{buynowState.totalPrice}</td>
                    </tr>
                    <tr>
                      <td>Delivery</td>
                      <td className="tableValues">₹80.00</td>
                    </tr>
                    <tr>
                      <td>Product Discount</td>
                      <td className="tableValues">
                        {numberFormat(buynowState.discountedVlaue)}
                      </td>
                    </tr>
                    <tr>
                      <th>Total Amount</th>
                      <td className="tableValues">
                        {numberFormat(buynowState.totalOrder)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card.Body>
              <div className="placeOrderButton">
                <Button className="placeorderButton" onClick={placeOrder}>
                  Place Order
                </Button>
              </div>
            </div>
            <input type="checkbox" className="checkBox" />
            <p className="noContactDelivery">
              Opt in for No-contact Delivery Unwell, or avoiding contact? Please
              select no-contact delivery. Partner will safely place the order
              outside your door (not for COD)
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Buynow;