import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { makeStyles } from "@mui/styles";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
import {useNavigate } from "react-router-dom";
import { SidebarData } from "./Util/SidebarData";
import "../Component.css";

const useSidebarStyles=makeStyles({
  box:{
    height: '35px',
    alignItems: 'center',
    marginLeft: '1.2rem',
    marginTop: '-2.1rem',
    cursor: 'pointer',
    display:'none',
    '@media (min-width: 0px) and (max-width:600px)': {
      display:'flex'
    }
  },
  list:{
    marginTop: '32px'
  },
  listItem:{
    paddingLeft:'8px',
    marginLeft:'8px'
  },
  prfileList:{
    width: "70%",
    height: "91%",
  },
  profileBox:{
    width: "fit-content",
    background: "none", 
    marginTop: "-15px", 
    marginRight: "5px",
    cursor: "pointer",
    color: "black"
  },
  profileBox2:{
    display: "inline-flex",
    position: "absolute", 
    bottom: 0,
    marginBottom: ".9rem",
    left: 0,
    marginLeft: ".7rem"
  },
  profileBox3:{
    display: "inline-flex",
    flexDirection: "column", 
    position: "absolute", 
    bottom:0, 
    right: 0,  
    height: "7%",
    alignContent: "center", 
    width:"60%"
  }
})

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const Username = localStorage.getItem("signUp");
  const navigate = useNavigate();
  const classes = useSidebarStyles();

  const handelPath =(item)=>{
    navigate(`${item.path}`)
    setSidebar(!sidebar);
  };

  return (
    <>
      <Box  className={classes.box}>
          <DehazeIcon fontSize='large'
            onClick={showSidebar}
          />
      </Box>
      <Box className={sidebar ? "menu active" : "menu"}>
      <List className={classes.list} >
        {SidebarData.map((text,index) => (
          <ListItem key={index} disablePadding className={classes.listItem}>
            <ListItemButton onClick={()=>handelPath(text)}>              
              <ListItemIcon>
              {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} primaryTypographyProps={{fontSize: '16px'}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        <List className={classes.prfileList} onClick={showSidebar}>
            <Box className={classes.profileBox}>
              <CloseIcon fontSize="large" data-testid="close"/>
            </Box>
        </List>
        <Box className={classes.profileBox2}>
          <AccountCircleIcon fontSize="large"/>
        </Box>
        <Box className={classes.profileBox3}>
          <span>{Username}</span>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;