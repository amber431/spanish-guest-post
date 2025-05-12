import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASEURL } from "../Api";

const UpdateEmail = () => {
  const [email, setEmail] = useState(""); 
  const [newEmail, setNewEmail] = useState(""); 
  const [message, setMessage] = useState("");
  const [animationClass, setAnimationClass] = useState("fadeIn");
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger Entry Animation
    setAnimationClass("bounceIn-in");
  
    // Get the role from localStorage
    const storedRole = localStorage.getItem("role");
  
    // Get the email based on the role
    if (storedRole === "user") {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        console.log("User Email from localStorage:", storedEmail); // Log the email
        setEmail(storedEmail); // Set the email in the state for user
      }
    } else if (storedRole === "publisher") {
      const storedPublisherEmail = localStorage.getItem("publisheremail");
      if (storedPublisherEmail) {
        console.log("Publisher Email from localStorage:", storedPublisherEmail); // Log the email
        setEmail(storedPublisherEmail); // Set the email in the state for publisher
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailToSend = email; // Current email from localStorage state
    const newEmailToSend = newEmail; // New email entered by the user
  
    try {
      // Get the role from localStorage to determine the API endpoint
      const role = localStorage.getItem("role");
  
      // Set the correct API endpoints based on the role
      let updateEndpoint;
      let resendOtpEndpoint;
  
      if (role === "user") {
        updateEndpoint = `${BASEURL}/auth/reg-update-email`; // User email update API
        resendOtpEndpoint = `${BASEURL}/auth/user-resend-otp`; // User OTP resend API
      } else if (role === "publisher") {
        updateEndpoint = `${BASEURL}/auth/reg-update-pub-email`; // Publisher email update API
        resendOtpEndpoint = `${BASEURL}/auth/resend-otp`; // Publisher OTP resend API
      }
  
      // Make the API call to update the email
      const updateEmailResponse = await axios.put(updateEndpoint, {
        email: emailToSend,
        newEmail: newEmailToSend,
      });
  
      console.log("Server response:", updateEmailResponse.data);
  
      if (updateEmailResponse.status === 200) {
        // Update localStorage and state based on the role
        if (role === "user") {
          localStorage.removeItem("email");
          localStorage.setItem("email", newEmailToSend);
        } else if (role === "publisher") {
          localStorage.removeItem("publisheremail");
          localStorage.setItem("publisheremail", newEmailToSend);
        }
        setEmail(newEmailToSend);
  
        // Resend OTP to the new email
        const resendOtpResponse = await axios.post(resendOtpEndpoint, {
          email: newEmailToSend.trim(),
        });
  
        if (resendOtpResponse.status === 200) {
          console.log("Resend OTP Success:", resendOtpResponse.data);
          toast.success("OTP resent successfully to your new email address.");
          setMessage("OTP resent successfully to your new email address.");
  
          // Delay navigation to allow toast to display
          setTimeout(() => {
            navigate("/verify-otp");
          }, 3000);
        } else {
          console.log("Resend OTP Failed:", resendOtpResponse.data);
          toast.error("Failed to resend OTP. Please try again later.");
        }
      } else if (updateEmailResponse.data?.message === "Email already exists.") {
        toast.error("This email already exists. Please use a different email.");
      } else {
        toast.error(updateEmailResponse.data?.message || "An unknown error occurred.");
      }
    } catch (err) {
      console.error("Error during API call:", err);
      if (err.response) {
        toast.error(err.response.data?.message || "An error occurred. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
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
              Please enter the new email address you want to update.
            </label>
            <input
              type="email"
              id="newEmail"
              className="form-control"
              style={{
                backgroundColor: "#233447",
                color: "white",
                border: "1px solid #ffffff",
                borderRadius: "5px",
                padding: "10px",
              }}
              placeholder="Enter your new email..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
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

export default UpdateEmail;
