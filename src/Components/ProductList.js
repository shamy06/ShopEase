import React, { Suspense, lazy } from "react";
import axios from 'axios';
import { useQuery } from "react-query";
import {
  Box,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircularProgress from '@mui/material/CircularProgress';
import ImageCarousel from "./imageCarousel";
import Search from "./Search";
import { useSearchProducts } from "./cartContext";
import "../Component.css";

const CommonProductTemplate = lazy(() => import("./Util/CommonProductTemplate"));

const useProductListStyle = makeStyles({
  box: {
    flexGrow: 1,
    margin: '40px',
    marginTop: '4rem'
  },
  loadingBox: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: '13.8rem',
    marginBottom: '17.5rem',
    '@media (min-width: 0px) and (max-width:600px)': {
      marginLeft: "3.5rem",
      marginTop: "12rem",
      marginBottom: '20rem',
    },
  },
  loadingIcon: {
    fontSize: '22rem'
  },
  loadingProductList: {
    marginLeft: "40rem !important",
    marginTop:" 1rem !important",
    fontSize: '1rem',
    '@media (min-width: 1400px)': {
      marginTop: '5.8rem !important',
      marginBottom: '4.1rem',
    }
  },
  box2: {
    flexGrow: 1,
    marginLeft: 0
  },
  maninBox:{
    marginLeft:'4px',
    width:"99%"
  }
})

const fetchQuery = () => {
  return axios.get('http://localhost:8081/product/viewAll')
}

const ProductList = () => {
  const classes = useProductListStyle();

  const { data: elements, isLoading } = useQuery('elements', fetchQuery, {
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    staleTime: Infinity,
    cacheTime: Infinity
  })

  const { search } = useSearchProducts()

  return (
    <>
      <Box className={classes.maninBox}>
        {isLoading ? (
          <Box className={classes.loadingBox}>
            Loading <CircularProgress className={classes.loadingIcon} />
          </Box>
        ) : search.length > 0 ? (
          <Box className={classes.box2}>
            <Search
              search={search}
            />
          </Box>
        ) : (<>
          <ImageCarousel products={elements.data} />
          <Box className={classes.box}>
            <Grid container rowSpacing={1} columnSpacing={{ xl: 5, lg: 5, md: 5, sm: 5, xs: 0 }} columns={{ xl: 12, lg: 12, md: 12, sm: 12 }}>
              <Suspense fallback={<Box className={classes.loadingProductList}>
                Loading.... <CircularProgress />
              </Box>}>
                <CommonProductTemplate product={elements.data} />
              </Suspense>
            </Grid>
          </Box>
        </>
        )}
      </Box>
    </>
  );
};

export default ProductList;