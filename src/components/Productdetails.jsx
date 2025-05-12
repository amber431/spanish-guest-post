import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { BASEURL } from "../Api.jsx";
import { useCart } from "../CartContext";

export default function ProductDetails() {
  const { addToCart , updateCart } = useCart();
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASEURL}/products/Detailproducts/${productid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productid]);

  const updateQuantity = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      return newQuantity > 0 ? newQuantity : 1; 
    });
  };;

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0">
              <div className="card-header text-white text-center">
                <h3 className="mb-0 txt">Product Details</h3>
              </div>
              <div className="card-body">
                <h2 className="display-4 fw-bold text-primary text-center">
                  {product.name}
                </h2>
                <p className="h4 text-success text-center">${totalPrice}</p> 
                <div className="d-flex justify-content-center align-items-center mb-4">
                
                </div>
                <button
                  type="button"
                  className="btn btnn w-100 py-2 text-white fw-bold shadow-sm"
                  onClick={() => addToCart(product)}
                >
                  <i className="fas fa-shopping-cart me-2"></i> Add to Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
