import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { searchDispatch } from "../Redux/Action/ProductAction";
import "../Component.css";

const BreadCrumb = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchHandler = () => {
    dispatch(searchDispatch(""));
  };

  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    let lastElement = pathnames[pathnames.length - 1];
    if (!isNaN(+lastElement) === true) {
      pathnames.splice(-1);
    }
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    
    return (
      <div className="breadcrumb-row">
        <Breadcrumb className="breadcrumb-item">
          {pathnames.length > 0 ? (
            <Breadcrumb.Item className="item" onClick={searchHandler}>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item className="item" onClick={searchHandler}>
              Home
            </Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item className="item" key={index}>
                {capatilize(name)}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item onClick={searchHandler} key={index}>
                <Link to={`${routeTo}`} className="item">
                  {capatilize(name)}
                </Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };
  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;