import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Api";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [animationClass, setAnimationClass] = useState("fadeIn");
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger Entry Animation
    setAnimationClass("bounceIn-in");

    // Check if the reset was successful and clear session storage
    if (message === "Password Reset Successful") {
      sessionStorage.removeItem("email");
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending request with email:", email);

    try {
      const response = await axios.post(`${BASEURL}/auth/forgot-password`, {
        email,
      });

      console.log("Response from server:", response);

      if (
        response.status === 200 &&
        response.data?.message ===
          "OTP sent to your email address. Please check it."
      ) {
        sessionStorage.setItem("email", email); // Store email in session storage
        setMessage("OTP sent successfully to your email.");
        navigate("/forgot-otp");
      } else if (
        response.data?.message === "Password Reset Successful"
      ) {
        setMessage("Password Reset Successful");
        sessionStorage.removeItem("email"); // Clear session storage
      } else {
        setMessage("No account found with this email.");
      }
    } catch (err) {
      console.error("Error during API call:", err);
      if (err.response) {
        const errorMessage =
          err.response.data?.message ||
          "An error occurred. Please try again later.";
        setMessage(errorMessage);
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 "
      style={{
        backgroundColor: "#1A1A1A",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-200px",
          width: "600px",
          height: "600px",
          backgroundColor: "#E3652D",
          borderRadius: "50%",
          zIndex: 0,
          opacity: 0.15,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          backgroundColor: "#E3652D",
          borderRadius: "50%",
          zIndex: 0,
          opacity: 0.1,
        }}
      ></div>
      <div
        className={`card shadow-sm p-4 ${animationClass}`}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#1f1d2c",
          borderColor: "#ffffff",
        }}
      >
        <div className="d-flex justify-content-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="currentColor"
            className="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
            style={{ color: "white" }}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              Please enter the email address associated with your account. A
              link to reset your password will be sent to this email.
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              style={{
                backgroundColor: "#233447",
                color: "#fff",
                border: "1px solid #ffffff",
                borderRadius: "5px",
                padding: "10px",
              }}
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btnn text-white w-100 mb-3"
            style={{
              backgroundColor: "#E3652D",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Send
          </button>
          {message && <p className="text-center text-muted">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
