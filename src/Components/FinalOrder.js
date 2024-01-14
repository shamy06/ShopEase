import React from "react";
import { useDispatch } from "react-redux";
import { datalistDispatch } from "../Redux/Action/ProductAction";

const PlaceOrder =()=>{
    const dispatch=useDispatch();
    const clearSearch = () => {
        dispatch(datalistDispatch(""));
      };
    
    return(<>
        <div className="placeOrderBody" onClick={clearSearch}>
            <h3>
            Your order has been placed.
        </h3>
        </div>        
        </>
    )
}
export default PlaceOrder;