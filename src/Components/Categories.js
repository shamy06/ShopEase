import React from "react";
import { useDispatch } from "react-redux";
import { datalistDispatch } from "../Redux/Action/ProductAction";
import BuynowButton from "./BuynowButton";
import AddtoCart from "./AddToCart";
import AddtoWishList from "./AddToWishList";
import Description from "./Description";
import Quantity from "./Quantity";
import Search from "./Search";
import "../Component.css";

const Categories = ({ categories, search, carts, wishList, buynow }) => {
  const dispatch=useDispatch();
  
  const clearSearch=()=>{
    dispatch(datalistDispatch(""))
  }
  
  return (
    <div className="row" onClick={clearSearch}>
      <div >
        <div className="ui stackable column grid" id="card-cartlist">
          { search.length>0 ?(
            <div className="categorySearch">
                <Search search={search} wishList={wishList} carts={carts} buynow={buynow} />
               </div>
            ) :categories.map((product) => {
            const { id, title, image, rating, category, price } = product;
            return (
              <div
                className="row-cart"
                key={id}
              >
                <div className="ui stcakbale card" id="box">
                  <AddtoWishList id={id} title={title} wishList={wishList} />
                  <div className="card">
                    <Description
                      id={id}
                      title={title}
                      image={image}
                      price={price}
                      rating={rating}
                      category={category}
                    />
                    <div className="product-info-2">
                      <Quantity product={product} />
                    </div>
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
};

export default Categories;