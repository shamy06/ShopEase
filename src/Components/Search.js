import React from "react";
import Description from "./Description";
import AddtoCart from "./AddToCart";
import AddtoWishList from "./AddToWishList";
import Quantity from "./Quantity";
import BuynowButton from "./BuynowButton";
import "../Component.css";

const Search = ({ search, wishList, carts,buynow }) => { 

  return (
    <div className="row" >
      <div>
        <div className="ui stackable column grid" id="">
          
        {
        typeof search!=="string" ? (
          search?.map((product) => {
            const {id, image, title, rating, price, category}=product
            
            return (
              <div className="row-productComponent" key={id} id="internal-productStyling">
                <div
                  className="ui stcakbale card" id="box"
                >
                   <AddtoWishList  id={id} title={title} wishList={wishList}/>
                  <div className="card">
                    <Description id={id} image={image} title={title} rating={rating} price={price} category={category}/>
                    <div className="product-info-2">
                      <Quantity product={product} />
                    </div>
                  </div>
                  <div className="AddToCart-Button">
                  <div className="buynowButton"><BuynowButton id={id} buynow={buynow}/></div>
                      <AddtoCart id={id} title={title} carts={carts}/>
                    </div>
                </div>
              </div>
            );
          })
        ) : (
          <div  className="emptySearch">
            No Product found
          </div>
        )}
      </div>
    </div>
    </div>  
  );
};

export default Search;