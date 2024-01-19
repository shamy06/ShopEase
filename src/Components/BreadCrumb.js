import React from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material"; 
import { useLocation, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useBreadcrumbStyle = makeStyles({
  breadcrumbBox: {
    marginTop: "0.3rem",
    marginLeft: "2.5rem",
    '@media (min-width: 0px) and (max-width:600px)': {
      marginLeft: "4rem",
    },
    '@media (min-width: 600px) and (max-width:900px)': {
      marginLeft: "1.8rem",
    }
  },
})

const BreadCrumb = () => {
  const location = useLocation();
  const classes = useBreadcrumbStyle();

  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    let lastElement = pathnames[pathnames.length - 1];

    if (!isNaN(+lastElement) === true) {
      pathnames.splice(-1);
    }

    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
      <Box className={classes.breadcrumbBox}>
        <Breadcrumbs>
          {pathnames.length > 0 ? (
            <Typography className={classes.cursor} >
              <Link to="/">Home</Link>
            </Typography>
          ) : (
            <Typography className={classes.cursor} >
              Home
            </Typography>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Typography
                className={classes.cursor}
                key={index}
              >
                {capatilize(name)}
              </Typography>
            ) : (
              <Typography key={index}>
                <Link to={routeTo}>
                  {capatilize(name)}
                </Link>
              </Typography>
            );
          })}
        </Breadcrumbs>
      </Box>
    );
  };
  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;