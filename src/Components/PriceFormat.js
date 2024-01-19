import { Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const numberFormat = ( value ) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const useOfrerStyle=makeStyles({
  card:{
    boxShadow: '2px 2px 7px 2px #999 !important'
  },
  typography:{
    padding: '10px 24px 0px 15px',
  },
  listText:{
    paddingLeft: '16px', 
    paddingTop: 0, 
    paddingBottom: 0
  }
})

export const Offers = () => {
  const classes=useOfrerStyle();
  
  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.typography}>Offers</Typography>
      <List>
        <ListItem  className={classes.listText}>
          <ListItemText>
            Get Rs.200 instant discount on your First Purchase above ₹999. Coupon
            code -NEW200.
          </ListItemText>
        </ListItem>
        <ListItem  className={classes.listText}>
          <ListItemText>
            Get extra 20% Cashback on prepaid orders above ₹499. Coupon code -
            NEW20. For new customers.
          </ListItemText>
        </ListItem>
        <ListItem  className={classes.listText}>
          <ListItemText>
            5% Cashback upto ₹100 on a minimum spend of ₹1,500 with PayPal.
          </ListItemText>
        </ListItem>
      </List>
    </Card>
  );
};