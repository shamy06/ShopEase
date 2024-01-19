import React, { Suspense, useEffect, useState, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useQueryClient } from "react-query";
import { useSearchProducts } from "./cartContext";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import ProductDetail2 from "./ProductDetail2";
import "../Component.css";

const SimilarProducts = lazy(()=>import("./SimilarProducts"));

const useContainerStyle = makeStyles({
  container: {
    marginLeft: '6px',
    marginTop: '6px',
    marginRight: '0px',
    marginBottom: '6px',
    maxWidth: '99% !important',
    '@media (min-width: 0px) and (max-width:600px)': {
      width: '93% !important',
    },
    '@media (min-width: 600px) and (max-width:900px)': {
      width: '100% important',
    },
  }
});

const ProductDetails = () => {
  const [recent, setRecent] = useState(false);
  const navigate = useNavigate();
  const param=useParams();
  const recentProducts = JSON.parse(localStorage.getItem("userData") || "[]");
  const loginUsername = localStorage.getItem("signUp");
  const classes = useContainerStyle();
  const queryClient = useQueryClient();
  const {data} = queryClient.getQueryData('elements');
  const {search} = useSearchProducts();

  const singleProduct = data.find(item => item.id === (param.id))|| data[0]
  
  const localStorageProductUpdate = recentProducts.map((productItem) => {
    
    if (productItem.userName === loginUsername) {
      if (!productItem.recentProductId.includes(singleProduct.id)) {
        productItem["recentProductId"].push(singleProduct.id);
      }
      return productItem.recentProductId;
    }
  });

  const recentViewedArray = localStorageProductUpdate.find(
    (e) => e !== undefined
  );

  localStorage.setItem("userData", JSON.stringify(recentProducts));

  const recentProductCarousel = () => {
    const { recentProductId } = recentProducts.find(
      (e) => e.userName === loginUsername
    );
    recentProductId.length > 1 ? setRecent(true) : setRecent(false);
  };

  useEffect(() => {
    if (loginUsername) {
      recentProductCarousel();
    }
  }, []);  

  const {
    category
  } = singleProduct;
  return (
    <>
      <Container maxWidth="xl" className={classes.container} >
        {search.length > 0 ? (
          navigate("/")
        ) : (
          <Box>
            <ProductDetail2 singleProduct={singleProduct}/>
            <Suspense fallback = {<h1>Loading..</h1>}>
            <SimilarProducts category={category} />
            </Suspense>
            {recent ? (
              <RecentlyViewedProducts recentViewedProduct={recentViewedArray} />
            ) : ( ""
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default ProductDetails;