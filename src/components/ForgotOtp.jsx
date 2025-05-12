import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Api";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotOtp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); 
  const [animationClass, setAnimationClass] = useState("bounceIn-in");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0); 
  const navigate = useNavigate();
  useEffect(() => {
    setAnimationClass("bounceIn-in");

    // Get email from session storage
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Email not found. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/forgot-password");
    }
  }, [navigate]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setAnimationClass("bounceOut-out");

      if (otp.trim().length !== 6 || isNaN(otp)) {
        toast.error("Please enter a valid 6-digit OTP.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const response = await axios.post(`${BASEURL}/auth/verify-otp`, {
        otp: otp.trim(),
        email: email.trim(),
      });

      if (response?.status === 200) {
        toast.success("OTP Verified Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => navigate("/reset-password"), 1000);
      } else {
        toast.error("OTP verification failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting OTP", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return; 

    setIsResending(true);

    try {
      const response = await axios.post(`${BASEURL}/auth/user-resend-otp`, { email: email.trim() });

      if (response?.status === 200) {
        toast.success("OTP resent successfully. Please check your email.", {
          position: "top-right",
          autoClose: 3000,
        });
        setResendCooldown(60); 
      } else {
        toast.error("Failed to resend OTP. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error resending OTP", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 `}
      style={{
        background: "linear-gradient(to right, #1f1d2c, #2096ed)",
      }}
    >
      <div
        className={`card shadow-sm p-4 ${animationClass}`}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgb(17, 87, 136)",
          borderColor: "#ffffff",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "white", fontWeight: "600" }}>
          Verify OTP
        </h3>
        <p className="text-center" style={{ color: "white", marginBottom: "20px" }}>
          Enter the 6-digit code sent to your email: <strong>{email}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              style={{
                letterSpacing: "5px",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btnn text-white w-100 mt-4"
            style={{
              border: "2px solid #fff",
              borderRadius: "7px",
              padding: "10px 0",
            }}
          >
            Verify
          </button>
        </form>
        <p
          className="text-center mt-3 resend-link"
          style={{ marginTop: "1rem", textAlign: "center", color: "white" }}
        >
          Didn’t receive the code?{" "}
          <span
            className="bounce-link"
            style={{
              color: "white",
              cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              textDecoration: resendCooldown > 0 ? "none" : "underline",
              opacity: resendCooldown > 0 ? 0.6 : 1,
            }}
            onClick={handleResendOtp}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : isResending
              ? "Resending..."
              : "Resend"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotOtp;
