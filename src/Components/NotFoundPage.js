import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {

    return(      
     <Card.Body className="notFoundPage"> 
    <h1>404 Page Not Found</h1> 
      <p>
        <Link to="/">Go to Home </Link>
      </p>
    </Card.Body>
  );
};

export default NotFoundPage;