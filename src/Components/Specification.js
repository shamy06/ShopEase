import React from "react";
import { Card } from "react-bootstrap";

const Specification = ({ specifications, brand }) => {
  const { ModelNumber, Color, OS, Memory } = specifications;

  return (
    <Card className="cardSpacing" id="specificationId">
      <h2 className="commonHeadings">Specifications</h2>
      <div className="specification">
      <table>
        <tbody>
          <tr ><td className="tableKeyData">Model Number</td><td className="tabledataSpecification">{ModelNumber}</td></tr>
          <tr><td className="tableKeyData">Color</td><td className="tabledataSpecification">{Color}</td></tr>
          <tr><td className="tableKeyData">Os</td><td className="tabledataSpecification">{OS}</td></tr>
          <tr><td className="tableKeyData">Memory</td><td className="tabledataSpecification">{Memory}</td></tr>
          <tr><td className="tableKeyData">Brand</td><td className="tabledataSpecification">{brand}</td></tr>
        </tbody>
      </table>
      </div>
    </Card>
  );
};

export default Specification;