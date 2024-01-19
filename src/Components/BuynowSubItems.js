
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { numberFormat } from "./PriceFormat";

const useBuynowSubStyles = makeStyles({
  typography: {
    padding: "20px 24px 10px 12px",
  },
  placeOrder: {
    margin: '16px', marginTop: '0'
  },
  buynowBox: {
    display: "inline-flex",
    marginBottom:"1rem !important",
    "@media (min-width: 0px) and (max-width:600px)": {
      display: "inline-block",
    },
    width: "78%",
    padding: "5px 0px 5px 0px",
  },
  imageBox: {
    height: "122px",
    maxWidth: "101px",
    marginLeft: "8px",
    "@media (min-width: 0px) and (max-width:600px)": {
      maxWidth: "80%",
      marginLeft: "36px",
    },
  },
  subTitleBox: {
    padding: "5px 0px 1px 24px",
  },
  shortDescription: {
    textAlign: "left !important",
    paddingBottom: "24px !important",
  },
  checkBox: {
    textAlign: "left", display: "flex",
  }
});

const OrderItems = ({ buynowItemslength }) => {
  const classes = useBuynowSubStyles();
  return (
    <Typography variant="h5" className={classes.typography}>
      Order Summary - {buynowItemslength}
      {buynowItemslength > 1 ? "items" : "item"}
    </Typography>
  );
};

export default OrderItems;

export const BuynowProductDetails = ({ item }) => {
  const classes = useBuynowSubStyles();
  const { image, title, subTitle, price, id, qnty, shortDescription } = item;

  return (
    <Box className={classes.buynowBox}>
      <Box className={classes.imageBox}>
        <img src={image} alt={title} className="buynowImages" />
      </Box>
      <Box className={classes.subTitleBox}>
        <Typography variant="h5">{subTitle}</Typography>
        <Typography variant="body" className={classes.shortDescription}>
          {shortDescription}
        </Typography>
        <Typography variant="h6" sx={{ color: "brown", width:"fit-content !important" }}>
          {numberFormat(price)}
        </Typography>
      </Box>
    </Box>
  );
};

export const BuynowPlaceOrder = () => {
  const classes=useBuynowSubStyles();
  const navigate = useNavigate();

  const placeOrder = () => {
    navigate("/placeorder");
  };

  return (
    <Box className={classes.placeOrder}>
      <Button variant="contained" fullWidth onClick={placeOrder}>
        Place Order
      </Button>
    </Box>
  );
};

export const BuynowCheckBox =()=>{
  const classes = useBuynowSubStyles();

  return(
    <Box sx={{ m: 1 }}>
    <Typography className={classes.checkBox}
    >
      <Checkbox /> Opt in for No-contact Delivery Unwell, or avoiding
      contact? Please select no-contact delivery. Partner will safely
      place the order outside your door (not for COD)
    </Typography>
  </Box>
  )
}