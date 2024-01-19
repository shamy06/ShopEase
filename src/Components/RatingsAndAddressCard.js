import { Box, Card, Rating, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useCommstyles = makeStyles({
  card: {
    border: "2px solid #ddd",
    marginTop: "32px",
    marginBottom:"2rem",
    boxShadow: "2px 2px 4px 2px #999",
  },
  tabelCell: {
    padding: "15px 25px 15px 22px",
    fontWeight: 550,
    fontSize: "20px",
  },
  box: {
    fontSize: "15px",
    padding: "18px 24px 10px 24px",
    fontFamily: ["Arial, Helvetica, sans-serif"],
  },
});

const Ratings = ({ rating }) => {
    const classes = useCommstyles();
  
    return (
      <Card variant="outlined" className={classes.card}>
        <TableContainer sx={{ maxWidth: 300 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tabelCell}>Ratings</TableCell>
                <TableCell align="left">
                  <Rating value={rating} size="large" />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Card>
    );
  };

export default Ratings;

export const AdrressCard = ({ addressCard }) => {
  const { name, emailId, mobile, address } = addressCard;
  const recentAddress = address.slice(-1)[0];
  const { Address1, Address2, Pincode, Country, State, City } = recentAddress;
  const classes = useCommstyles();

  return (
    <Box className={classes.box}>
      {name}
      <Typography>{Address1}</Typography>
      <Typography>{Address2}</Typography>
      <Typography>
        {Country}, {State}
      </Typography>
      <Typography>
        {City}- {Pincode}
      </Typography>
      <Typography>Mobile- {mobile}</Typography>
      <Typography>Email- {emailId}</Typography>
    </Box>
  );
};