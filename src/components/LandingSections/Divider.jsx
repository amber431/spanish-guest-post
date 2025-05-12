import React from "react";
import "./Divider.css";

const Divider = ({ color = "#E3652D", thickness = "2px", pattern = "solid", width = "100%" }) => {
  return (
    <div
      style={{
        borderBottom: `${thickness} ${pattern} ${color}`,
        width: width,
        margin: "1rem auto",
      }}
    ></div>
  );
};

export default Divider;
