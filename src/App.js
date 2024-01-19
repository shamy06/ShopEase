import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/Navbar";
import BreadCrumb from "./Components/BreadCrumb";
import ProductList from "./Components/ProductList";
import ScrollToTop from "./Components/ScrollTop";
import CustomizedSnackbars from "./Components/Snackbar";
import { CartProvider } from "./Components/cartContext";
import { useLazyFooter } from "./Components/MuiStyles";
import "./App.css";

const Registration = lazy(() => import("./Components/Registration"));
const Login = lazy(() => import("./Components/Login"));
const Sidebar = lazy(() => import("./Components/Sidebar"));
const PlaceOrder = lazy(() => import("./Components/finalOrder"));
const Buynow = lazy(() => import("./Components/Buynow"));
const Wishlist = lazy(() => import("./Components/Wishlist"));
const Cart = lazy(() => import("./Components/Cart"));
const Categories = lazy(() => import("./Components/Categories"));
const Product = lazy(() => import("./Components/Product"));
const NotFoundPage = lazy(() => import("./Components/NotFoundPage"));

const queryClient = new QueryClient();

function App() {
  const classes = useLazyFooter();
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <CartProvider>
          <Router>
            <CustomizedSnackbars />
            <NavBar />
            <BreadCrumb />
            <Sidebar />
            <ScrollToTop />
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route
                path="/product/:id"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <Product />
                  </Suspense>
                }
              />
              <Route
                path="/categories/:category"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <Categories />
                  </Suspense>
                }
              />
              <Route
                path="/cart"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <Cart />
                  </Suspense>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <Wishlist />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <NotFoundPage />
                  </Suspense>
                }
              />
              <Route
                path="/buynow"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <Buynow />
                  </Suspense>
                }
              />
              <Route
                path="/login"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="/registration"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <Registration />
                  </Suspense>
                }
              />
              <Route
                path="/placeorder"
                element={
                  <Suspense
                    fallback={
                      <Box className={classes.lazyStyling}>"Loading..."</Box>
                    }
                  >
                    <PlaceOrder />
                  </Suspense>
                }
              />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </Box>
    </QueryClientProvider>
  );
}

export default App;