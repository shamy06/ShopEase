import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import Footer from "./Components/Footer";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import NotFoundPage from "./Components/NotFoundPage";
import Categories from "./Components/Categories";
import Wishlist from "./Components/Wishlist";
import Buynow from "./Components/Buynow";
import NavBar from "./Components/Navbar";
import BreadCrumb from "./Components/BreadCrumb";
import ProductList from "./Components/ProductList";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import PlaceOrder from "./Components/finalOrder";
import ScrollToTop from "./Components/ScrollTop";
import "./App.css";

function App() {
  const { allProducts } = useSelector((state) => state);
  const { products, wishList, categories, carts, search, loading, error, dataList, buynow, singleProductAdded } = allProducts;
  const wishListItemCount = wishList.length;
  const cartsItemCount = carts.length;

  return (
    <div className="App">
      <Router>
        <ToastContainer
          position="top-right"
          theme="colored"
          transition={Zoom}
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
        <NavBar dataList={dataList} cartsItemCount={cartsItemCount} wishListItemCount={wishListItemCount} />
        <BreadCrumb />
        <Sidebar />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<ProductList products={products} search={search} dataList={dataList} loading={loading} error={error} carts={carts} wishList={wishList} buynow={buynow} />} />
          <Route path="/product/:id" element={<Product search={search} singleProduct={singleProductAdded} wishList={wishList} carts={carts} buynow={buynow} />} />
          <Route path="/categories/:category" element={<Categories categories={categories} search={search} carts={carts} wishList={wishList} buynow={buynow} />} />
          <Route path="/cart" element={<Cart search={search} carts={carts} wishList={wishList} buynow={buynow} />} />
          <Route path="/wishlist" element={<Wishlist wishList={wishList} search={search} buynow={buynow} carts={carts} />} />
          <Route path="*" element={<NotFoundPage loading={loading} error={error} wishList={wishList} buynow={buynow} carts={carts} />} />
          <Route path="/buynow" element={<Buynow search={search} buynow={buynow} wishList={wishList} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;