import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { numberFormat } from "../PriceFormat";
import { productDetail } from "../../Redux/Action/ProductAction";
import "../../Component.css";

export const SlidesToShow = () => {
  return <div>3</div>;
};

export const settings = {
  arrows: true,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 2,
  lazyLoad: true,
  autoplay: false,
  dots: false,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 830,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 670,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
  ],
};

export const thumbnailSettings = {
  arrows: true,
  infinite: true,
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  lazyLoad: false,
  autoplay: false,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 959,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 361,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
  ],
};

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <>
      <div className={className} onClick={onClick}>
        <MdArrowBackIos style={{ color: "black", fontSize: "35px" }} />
      </div>
    </>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <>
      <div className={className} onClick={onClick}>
        <MdArrowForwardIos style={{ color: "black", fontSize: "35px" }} />
      </div>
    </>
  );
};

export const mainCarouselSettings = {
  arrows: true,
  infinite: true,
  dots: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  lazyLoad: true,
  autoplay: true,
  autoplaySpeed: 3500,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  responsive: [
    {
      breakpoint: 1125,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 666,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
      },
    },
  ],
};

export const CommonCarouselProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelProductDetails = (id) => {
    navigate(`/product/${id}`);
    dispatch(productDetail(id));
  };

  return (
    <Slider className="smilarSlick" {...settings}>
      {products.map((item) => {
        const { title, id, image, price } = item;
        return (
          <div className="left-similarImage" key={id}>
            <div onClick={(e) => handelProductDetails(id)} className="nav-link">
              <Card className="hoverImage" id="box">
                <div id="similarCard">
                  <img
                    src={image}
                    alt={title}
                    className="similarProductImages"
                  />
                </div>
              </Card>
            </div>
            <h5 className="similarCarosule">{title}</h5>
            <h5 className="similarCarosule">{numberFormat(price)}</h5>
          </div>
        );
      })}
    </Slider>
  );
};

export const RecentlyViewedProductsCarousel = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recentProductsLength = products.length;
  const [slides, setSlides] = useState(recentProductsLength);

  const handelProductDetails = (id) => {
    navigate(`/product/${id}`);
    dispatch(productDetail(id));
  };

  const setting = {
    arrows: true,
    infinite: true,
    slidesToShow: recentProductsLength,
    slidesToScroll: 2,
    lazyLoad: false,
    autoplay: false,
    dots: false,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div>
      {recentProductsLength <= 2 && window.innerWidth >= 385 ? (
        <div className="recentProduct-Container">
          {products.map((item) => {
            const { title, id, image, price } = item;
            return (
              <div className="recentProductSub-Continer" key={id}>
                <div onClick={(e) => handelProductDetails(id)}>
                  <Card className="recentProductCard" id="box">
                    <img src={image} alt={title} className="recentImages" />
                  </Card>
                </div>
                <h5 className="recentCarosule">{title}</h5>
                <h5 className="recentCarosule">{numberFormat(price)}</h5>
              </div>
            );
          })}
        </div>
      ) : recentProductsLength === 3 && window.innerWidth >= 830 ? (
        <div className="recentProduct-Container">
          {products.map((item) => {
            const { title, id, image, price } = item;
            return (
              <div className="recentProductSub-Continer" key={id}>
                <div onClick={(e) => handelProductDetails(id)}>
                  <Card className="recentProductCard" id="box">
                    <img src={image} alt={title} className="recentImages" />
                  </Card>
                </div>
                <h5 className="recentCarosule">{title}</h5>
                <h5 className="recentCarosule">{numberFormat(price)}</h5>
              </div>
            );
          })}
        </div>
      ) : (recentProductsLength === 4 || recentProductsLength === 5) &&
        window.innerWidth >= 951 ? (
        <div className="recentProduct-Container">
          {products.map((item) => {
            const { title, id, image, price } = item;
            return (
              <div className="recentProductSub-Continer" key={id}>
                <div onClick={(e) => handelProductDetails(id)}>
                  <Card className="recentProductCard" id="box">
                    <img src={image} alt={title} className="recentImages" />
                  </Card>
                </div>
                <h5 className="recentCarosule">{title}</h5>
                <h5 className="recentCarosule">{numberFormat(price)}</h5>
              </div>
            );
          })}
        </div>
      ) : (
        <Slider className="smilarSlick" {...setting}>
          {products.map((item) => {
            const { title, id, image, price } = item;
            return (
              <div className="left-similarImage" key={id}>
                <div
                  onClick={(e) => handelProductDetails(id)}
                  className="nav-link"
                >
                  <Card className="hoverImage" id="box">
                    <div id="similarCard">
                      <img
                        src={image}
                        alt={title}
                        className="similarProductImages"
                      />
                    </div>
                  </Card>
                </div>
                <h5 className="similarCarosule">{title}</h5>
                <h5 className="similarCarosule">{numberFormat(price)}</h5>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export const AdrressCard = ({ addressCard }) => {
  const { name, emailId, mobile, address } = addressCard;
  const recentAddress = address.slice(-1)[0];
  const { Address1, Address2, Pincode, Country, State, City } = recentAddress;

  return (
    <div className="savedAdrress">
      {name}
      <div>{Address1}</div>
      <div>{Address2}</div>
      <div>
        {Country}, {State}
      </div>
      <div>
        {City}- {Pincode}
      </div>
      <div>Mobile- {mobile}</div>
      <div>Email- {emailId}</div>
    </div>
  );
};