import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CommonCarouselProducts } from "./Util/CommonComponets";
import { categoryProducts } from "../Redux/Action/ProductAction";

const SimilarProducts = ({category}) => {
  const dispatch=useDispatch();

  useEffect (()=>{
    dispatch(categoryProducts(category));
   },[])
   
  const { allProducts } = useSelector((state) => state);
  const { categories } = allProducts;
  
  return (
    <div className="similarProductsCard">
      <h2 className="similarProductHeading">Similar products</h2>
         <CommonCarouselProducts products={categories}/>
      </div>
  );
};

export default SimilarProducts;