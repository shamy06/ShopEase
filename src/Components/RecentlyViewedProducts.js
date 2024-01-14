import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CommonCarouselProducts,
  RecentlyViewedProductsCarousel,
} from "./Util/CommonComponets";

const RecentlyViewedProducts = ({ recentViewedProduct }) => {
  const { allProducts } = useSelector((state) => state);
  const { products } = allProducts;
  const recentProducts = products.filter((item) =>
    recentViewedProduct.find((productId) => item.id === parseInt(productId))
  );
  const recentProductsLength = recentViewedProduct.length;

  const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth]);
    useEffect(() => {
      const handelResize = () => {
        setSize([window.innerWidth]);
      };
      window.addEventListener("resize", handelResize);
    }, []);
    return size;
  };

  const [width] = useWindowSize();

  return (
    <>
      <div className="similarProductsCard">
        <h2 className="recentProductHeading">Recently Viewed Products</h2>
      </div>
      {recentProductsLength >= 6 ? (
        <CommonCarouselProducts products={recentProducts} />
      ) : width <= 830 && width > 670 && recentProductsLength >= 3 ? (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      ) : width <= 830 && width > 670 && recentProductsLength <= 2 ? (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      ) : width <= 950 && width > 830 && recentProductsLength === 3 ? (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      ) : recentProductsLength === 4 || recentProductsLength === 5 ? (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      ) : (
        <RecentlyViewedProductsCarousel products={recentProducts} />
      )}
    </>
  );
};

export default RecentlyViewedProducts;