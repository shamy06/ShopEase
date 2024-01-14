import React from "react";
import { useDispatch } from "react-redux";
import { datalistDispatch } from "../Redux/Action/ProductAction";
import BuynowButton from "./BuynowButton";
import Description from "./Description";
import AddtoCart from "./AddToCart";
import RemoveProduct from "./RemoveProduct";
import Quantity from "./Quantity";
import "../Component.css";

const Wishlist = ({ wishList, search, buynow, carts }) => {
  const dispatch = useDispatch();

  const clearSearch = () => {
    dispatch(datalistDispatch(""));
  };

  if (wishList.length <= 0) {
    return (
      <div className="emptyPage" onClick={clearSearch}>
        WishList is Empty!!
      </div>
    );
  } else {
    return (
      <div id="wishlist-footer" onClick={clearSearch}>
        <div className="row">
          <div className="ui stackable column grid" id="card-cartlist">
            {search.length > 0 && typeof search !== "string"
              ? search.map((product) => {
                  const { id, image, title, rating, price, category } = product;
                  return (
                    <div className="row-cart" key={id}>
                      <div className="ui stackable card" id="internalHeight">
                        <div className="card">
                          <Description
                            id={id}
                            image={image}
                            title={title}
                            rating={rating}
                            price={price}
                            category={category}
                          />
                          <div className="product-info-2">
                            <Quantity product={product} />
                          </div>
                          <RemoveProduct id={id} title={title} />
                        </div>
                        <div className="AddToCart-Button">
                          <div className="buynowButton">
                            <BuynowButton id={id} buynow={buynow} />
                          </div>
                          <AddtoCart id={id} title={title} carts={carts} />
                        </div>
                      </div>
                    </div>
                  );
                })
              : wishList.map((product) => {
                  const { id, image, title, rating, price, category } = product;
                  return (
                    <div className="row-cart" key={id}>
                      <div className="ui stackable card" id="internalHeight">
                        <div className="card">
                          <Description
                            id={id}
                            image={image}
                            title={title}
                            rating={rating}
                            price={price}
                            category={category}
                          />
                          <div className="product-info-2">
                            <Quantity product={product} />
                          </div>
                          <RemoveProduct id={id} title={title} />
                        </div>
                        <div className="AddToCart-Button">
                          <div className="buynowButton">
                            <BuynowButton id={id} buynow={buynow} />
                          </div>
                          <AddtoCart id={id} title={title} carts={carts} />
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    );
  }
};

export default Wishlist;