import axios from "axios";
import { data } from "../../Components/ProductData";

export const fetchSuccess = () => {
  return async function (dispatch) {
    dispatch(fetchRequest())
    await axios
      .get("https://my-json-server.typicode.com/shamy06/demo-1/Products")
      .then((response) => {
        let combinedProductList=response.data;
        combinedProductList=combinedProductList.concat(data)
        dispatch({ type: "FETCH_SUCCESS", payload: combinedProductList });
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
};

export const fetchRequest = () => {
  return {
    type: "FETCH_REQUEST",
  };
};

export const fetchFailure = (error) => {
  return {
    type: "FETCH_FALIURE",
    payload: error,
  };
};

export const productDetail =(id)=>{
  return{
    type:"PRODUCT_DETAIL",
    payload: id,
  };
}

export const addToWishList = (getdata) => {
  return {
    type: "SAVE_TO_WISHLIST",
    payload: getdata,
  };
};

export const addProductToWishList =(id) => (dispatch)=>{
  dispatch(addToWishList(id))
}

export const addToCart = (getdata) => {
  return {
    type: "ADD_PRODUCT_TO_CART",
    payload: getdata,
  };
};

export const addProductToCart =(id) => (dispatch)=>{
  dispatch(addToCart(id))
}

export const deleteWishListProduct = (getdata) => {
  return {
    type: "DELETE_WISHLIST_PRODUCT",
    payload: getdata,
  };
};

export const deleteCartProduct = (item) => {
  return {
    type: "DELETE_CART_PRODUCT",
    payload: item,
  };
};

export const datalistDispatch = (data) => {
  return {
    type: "SEARCH_BY_DATALIST",
    payload: data,
  };
};

export const searchDispatch = (data) => {
  return {
    type: "FILTER_BY_SEARCH",
    payload: data,
  };
};

export const categorySearch = (data) => {
  return {
    type: "SEARCH_BY_CATEGORY",
    payload: data,
  };
};

export const wishListSearch = (data) => {
  return {
    type: "SEARCH_BY_WISHLIST",
    payload: data,
  };
};

export const cartListSearch = (data) => {
  return {
    type: "SEARCH_BY_CART",
    payload: data,
  };
};

export const categoryProducts = (data) => {
  return {
    type: "CATEGORY_PRODUCTS",
    payload: data,
  };
};

export const buynowProduct =(productId)=>{
  return {
    type: "BUYNOW_PRODUCTS",
    payload: productId,
  };
}

export const deleteBuynowProduct = (productId) => {
  return {
    type: "DELETE_BUYNOW_PRODUCTS",
    payload: productId,
  };
};