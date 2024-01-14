import React ,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import AddtoCart from "./AddToCart";
import AddtoWishList from "./AddToWishList";
import Quantity from "./Quantity";
import BuynowButton from "./BuynowButton";
import SimilarProducts from "./SimilarProducts";
import Specification from "./Specification";
import Imageslider from "./Imageslider";
import { numberFormat } from "./PriceFormat";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import { datalistDispatch } from "../Redux/Action/ProductAction";
import "../Component.css";

const ProductDetails = ({ search,singleProduct,wishList,carts, buynow }) => {
  const [recent, setRecent] = useState(false);
  const dispatch=useDispatch();
  const recentProducts = JSON.parse(localStorage.getItem("userData")||"[]");
  const loginUsername = localStorage.getItem("signUp");
  
  const localStorageProductUpdate = recentProducts.map((productItem) => {
    if (productItem.userName === loginUsername) {
      if (!productItem.recentProductId.includes(singleProduct.id)) {
        productItem["recentProductId"].push(singleProduct.id);
      }
      return productItem.recentProductId;
    }
  });

  const recentViewedArray = localStorageProductUpdate.find(e => e!==undefined);

  localStorage.setItem("userData", JSON.stringify(recentProducts));

  const recentProductCarousel = () => {
    const { recentProductId } = recentProducts.find(
      (e) => e.userName === loginUsername
    );
    recentProductId.length > 1 ? setRecent(true) : setRecent(false);
  };
  const clearSearch = () => {
    dispatch(datalistDispatch(""));
  };
  
  const navigate=useNavigate();
  
  useEffect(() => {
    if(loginUsername){
    recentProductCarousel();
    }
  },[]);

  const {
    id,
    title,
    subTitle,
    thumbnails,
    price,
    description,
    category,
    rating,
    specifications,
    brand,
  } = singleProduct;

  return (
    <Card.Body id="card-id">
      {search.length>0 ? (
        navigate("/")
            ) : (
      <div onClick={clearSearch}>
        <div className="ui two column stackable center aligned grid" key={id}>
          <div className="column" id="column1">
            <div id="detail-card">
              <div id="productDetail-wishListIcon">
                <AddtoWishList id={id} title={title} wishList={wishList}/>
              </div>
              <Imageslider thumbnails={thumbnails} />
            </div>
           <div className="specificationCard1"> 
           <div className="AddToCart-Button-Detail">
              <BuynowButton id={id} buynow={buynow} />
              <div id="row-cartbutton">
                <AddtoCart id={id} title={title} carts={carts}/>
              </div>
            </div>
           <Card className="cardSpacing">
           <table>
                  <tbody>
                  <tr>
                    <th className="tableHeader">Ratings</th>
                    <td >
                      <ReactStars size={25} value={rating} isHalf={true} />
                    </td>
                  </tr>
                  </tbody>
                </table>
                </Card>
            </div>
          </div>
          <div className="column" id="column2">
            <h1 className="header">{subTitle}</h1>
            <h2 className="header">{numberFormat(price)}</h2>
            <div className="productDetailQuantity">
              <Quantity product={singleProduct} />
            </div>
            <Card className="cardSpacing">
              <h2 className="commonHeadings">Product Description</h2>
              <div className="card" id="decription">
                <p>{description}</p>
              </div>
            </Card>
            {category === "smartphones" ? (
             <div>
             <Specification specifications={specifications} brand={brand} />
             </div>
            ) : (
              ""
            )}
            <Card className="cardSpacing" id="productRatings">
              <div>
                <table>
                  <tbody>
                  <tr>
                    <th className="tableHeader">Ratings</th>
                    <td>
                      <ReactStars size={25} value={rating} isHalf={true} />
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </Card>
            <div className="AddToCart-Button-Detail" id="productRatings">
              <BuynowButton id={id} buynow={buynow} />
              <div id="row-cartbutton">
                <AddtoCart id={id} title={title} carts={carts}/>
              </div>
            </div>
          </div>
        </div>
        <SimilarProducts category={category} />
        {recent ? <RecentlyViewedProducts recentViewedProduct={recentViewedArray}/> : ""}
      </div>
)}
    </Card.Body>
  );
};

export default ProductDetails;