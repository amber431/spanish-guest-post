import React from "react";
import { useCart } from "../CartContext";

const ViewCartButton = () => {
  const { showViewCartButton } = useCart();

  const handleViewCartClick = () => {
    window.location.href = "/cart"; 
  };

  return (
    showViewCartButton && (
      <button
        onClick={handleViewCartClick}
        style={{
          marginTop: "20px",
          backgroundColor: "#2A3855",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
        View Cart
      </button>
    )
  );
};

export default ViewCartButton;
