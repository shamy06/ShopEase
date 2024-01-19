import { makeStyles } from "@mui/styles";

export const useCommonStyes = makeStyles({
  emptyPage:{
      display: "flex",
      fontSize: "3.2rem",
      fontWeight: "bold",
      justifyContent: "center",
      alignContent: "center",
      flexWrap: "wrap",
      height: "79.5vh"
  },
  OuterBox:{
  margin:'2.5rem',
  marginBottom:"3.7rem"
  }
});

export const useLazyFooter = makeStyles({
  lazyStyling:{
      display: "flex",
      fontSize: "1.8rem",
      fontWeight: "bold",
      justifyContent: "center",
      alignContent: "center",
      flexWrap: "wrap",
      height: "79.6vh"
  },
});

export const useRegistrationStyles=makeStyles({
  box:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'2rem'
  },
  typographyOne: {
    marginTop: "1rem",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
  },
  formBox:{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
  },
  mainBox:{ 
    '@media (min-width: 0px) and (max-width:600px)': {
    marginLeft:"5rem"
    }
  },
  formlabel:{
    marginRight: "10px",
    display: "flex",
    width: "40%",
    color: "black",
    '@media (min-width: 0px) and (max-width:600px)': {
      marginTop: "5px",
      marginBottom:"0px",
      width:"60%"
    },
    alignItems: "center"
  },
  filedBox:{
    display: "flex",
    width:"100%",
    '@media (min-width: 0px) and (max-width:600px)': {
    width: "70%",
    display:"block"
  },
},
  error:{
    color:"red",
    marginLeft:'10.75rem !important',
    '@media (min-width: 0px) and (max-width:600px)': {
      marginLeft:'0px !important'
    },
    '@media (min-width: 600px) and (max-width:900px)': {
      marginLeft:'9.75rem !important'
    },
    '@media (min-width: 900px) and (max-width:1200px)': {
      marginLeft:'10.75rem !important'
    }
  },
  buttonBox:{
    margin:'16px',
    display:"flex",
    justifyContent:"center",
    alignItems:"center", 
    '@media (min-width: 1400px)': {
      marginBottom:'4.1rem'
    }
  },
  color:{
    color:"red"
  }
});