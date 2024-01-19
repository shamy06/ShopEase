import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { makeStyles } from "@mui/styles";
import "../Component.css";

const useScrollTopStyle= makeStyles({
    scrollIcon:{
        position: 'fixed',
        bottom: '40px',
        right: '25px',
        zIndex: 2,
        backgroundColor: '#212121',
        border: '2px solid #fff', 
        borderRadius: '50%',
        height:'50px',
        width: '50px',
        color: '#fff',
        cursor: 'pointer',
    }
})

const ScrollToTop =()=>{
    const [showTopBtn,setShowTopButton]=useState(true);
    const classes=useScrollTopStyle();
    
    useEffect(()=>{
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Box>
            {showTopBtn && (
                <ArrowCircleUpIcon  fontSize="large" className={classes.scrollIcon}                    
                    onClick={goToTop}
                    data-testid="top-button"
                />
            )}
        </Box>
    );
}

export default ScrollToTop;