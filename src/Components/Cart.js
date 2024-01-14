import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Description from "./Description";
import RemoveProductFromCart from "./RemoveProductFromCart";
import BuynowButton from "./BuynowButton";
import { numberFormat } from "./PriceFormat";
import {
  deleteCartProduct,
  datalistDispatch,
} from "../Redux/Action/ProductAction";
import "../Component.css";

const Cart = ({search, carts, buynow }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const cartLength = carts.length;
  const [quantity, setQuantity] = useState(0);

  const clearSearch = () => {
    dispatch(datalistDispatch(""));
  };

  const increase = (product) => {
    product.qnty += 1;
    setQuantity(quantity + 1);
  };

  const decrease = (product) => {
    if (quantity > 1 || product.qnty > 1) {
      product.qnty -= 1;
      setQuantity(quantity - 1);
    }
  };

  const price = () => {
    let totalPrice = 0;
    carts.map((item) => {
      totalPrice =
        Math.round((item.price * item.qnty + totalPrice) * 100) / 100;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    price();
  }, [cartLength, quantity]);

  useEffect(() => {
    return () => {
      setTotalPrice(0);
    };
  }, []);

  const handleCartitems = () => {
    dispatch(deleteCartProduct(carts));
  };

  if (cartLength <= 0) {
    return (
      <div className="emptyCart" onClick={clearSearch}>
        Cart is empty
      </div>
    );
  } else {
    return (
      <div id="wishlist-footer" onClick={clearSearch}>
        <div className="row">
          <div className="ui stackable column grid" id="card-cartlist">
            {search.length>0 && typeof search !== "string"? (
              search.map((product) => {
                const { id, image, title, rating, price, category, qnty } =
                  product;
                return (
                  <div className="row-cart" key={id}>
                    <div className="ui  stackable card" id="wishListInteral">
                      <div className="card">
                        <Description
                          id={id}
                          image={image}
                          title={title}
                          rating={rating}
                          price={price}
                          category={category}
                        />
                        <div
                          className="product-info-2"
                          style={{ marginBottom: "0px !important" }}
                        >
                          <div className="quantity">
                            Quantity
                            <Button
                              id={
                                qnty > 1 ? "cartquantity-Button" : "cartnonActive"
                              }
                              onClick={() => decrease(product)}
                            >
                              -
                            </Button>
                            <span id="cartquantity-Button">{qnty}</span>
                            <Button
                              id="cartquantity-Button"
                              onClick={() => increase(product)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="cartremoveButton">
                          <RemoveProductFromCart id={id} title={title} />
                        </div>
                      </div>
                    </div>
                  </div>
                )})
              ):carts.map((product) => {
              const { id, image, title, rating, price, category, qnty } =
                product;
              return (
                <div className="row-cart" key={id}>
                  <div className="ui  stackable card" id="wishListInteral">
                    <div className="card">
                      <Description
                        id={id}
                        image={image}
                        title={title}
                        rating={rating}
                        price={price}
                        category={category}
                      />
                      <div
                        className="product-info-2"
                        style={{ marginBottom: "0px !important" }}
                      >
                        <div className="quantity">
                          Quantity
                          <Button
                            id={
                              qnty > 1 ? "cartquantity-Button" : "cartnonActive"
                            }
                            onClick={() => decrease(product)}
                          >
                            -
                          </Button>
                          <span id="cartquantity-Button">{qnty}</span>
                          <Button
                            id="cartquantity-Button"
                            onClick={() => increase(product)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="cartremoveButton">
                        <RemoveProductFromCart id={id} title={title} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {search.length>0 ? "":
        <>
        <div className="Total">Total {numberFormat(totalPrice)}</div>
        <div className="cartbuynowButton" onClick={handleCartitems}>
          <BuynowButton id={carts} buynow={buynow} />
        </div>
        </>
  }
      </div>
    );
  }
};

export default Cart;