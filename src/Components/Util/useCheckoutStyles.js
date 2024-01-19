import { makeStyles } from "@mui/styles";

const usecheckoutStyle = makeStyles({
  typographyHeading: {
    padding: "10px 20px 15px 12px",
  },
  card: {
    marginBottom: "15px",
    width: "100%",
    border: "2px solid #ddd",
    boxShadow: "2px 2px 7px 2px #999",
  },
  editBox: {
    dispaly: "flex",
    float: "right",
    cursor: "pointer",
    padding: "5px",
  },
  addAddressBox: {
    display: "flex",
    justifyContent: "right",
    textDecoration: "underline",
    color: "blueviolet",
    marginBottom: "20px",
    cursor: "pointer",
    fontSize: "15px",
  },
  typographyOne: {
    marginTop: "1rem",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
  },
  label: {
    width: "22%",
    color: "balck",
    display: "inline-flex",
    marginTop: "16px",
    "@media (min-width: 0px) and (max-width:1200px)": {
      width: "28%",
      marginLeft: "0px",
    },
  },
  label2: {
    width: "22%",
    marginTop: "16px",
    marginLeft: "-24px",
    display: "inline-flex",
    color: "balck",
    "@media (min-width: 0px) and (max-width:1200px)": {
      width: "28%",
      marginLeft: "0px",
    },
  },
  lable3: {
    width: "16%",
    color: "balck",
    id: "country",
    display: "inline-flex",
    marginTop: "24px",
    "@media (min-width: 0px) and (max-width:1200px)": {
      width: "27%",
    },
  },
  formControl: {
    margin: "8px !important",
    minWidth: "20% !important",
  },
  save: {
    display: "flex",
    justifyContent: "right",
    alignItems: "right",
    margin: "16px",
    paddingRight: "8rem",
  },
  errorMsgOne: {
    color: "red",
    marginLeft: "6.5rem !important",
    "@media (min-width: 600px) and (max-width:900px)": {
      marginLeft: "15rem !important",
    },
    "@media (min-width: 900px) and (max-width:1200px)": {
      marginLeft: "9.5rem !important",
    },
  },
  errorMsgTwo: {
    color: "red",
    marginLeft: "4.8rem !important",
    "@media (min-width: 600px) and (max-width:900px)": {
      marginLeft: "15rem !important",
    },
    "@media (min-width: 0px) and (max-width:600px)": {
      marginLeft: "6.25rem !important",
    },
    "@media (min-width: 900px) and (max-width:1200px)": {
      marginLeft: "9.5rem !important",
    },
  },
  color: {
    color: "red",
  },
});

export default usecheckoutStyle;