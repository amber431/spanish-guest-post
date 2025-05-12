import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from '../Api'; 
import axios from "axios";
import { toast } from "react-toastify";

function PubOtpform() {
  const [otp, setOtp] = useState('');
  const [animationClass, setAnimationClass] = useState('bounceIn-in');
  const [isResendDisabled, setIsResendDisabled] = useState(false); 
  const [resendTimer, setResendTimer] = useState(60); 
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger Entry Animation
    setAnimationClass('bounceIn-in');
  }, []);

  useEffect(() => {
    let timer;
    if (isResendDisabled && resendTimer > 0) {
      // Start countdown for resend
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsResendDisabled(false); // Enable resend after timer finishes
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Countdown every second
    }

    return () => clearInterval(timer); // Cleanup interval on component unmount or change
  }, [isResendDisabled, resendTimer]);

  const handleSubmit = async (e) => {
    const Email = localStorage.getItem("publisheremail");
    e.preventDefault();
    try {
      setAnimationClass('bounceOut-out'); // Trigger exit animation
      const enteredOtp = otp.trim(); // Ensure no extra spaces
      if (enteredOtp.length !== 6 || isNaN(enteredOtp)) {
        toast.error("Please enter a valid 6-digit OTP.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const response = await axios.post(`${BASEURL}/auth/pub-otp`, {
        email: Email,
        otp: enteredOtp,
      });

      if (response?.data?.message) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }

      setTimeout(() => navigate("/login"), 1000); // Wait for exit animation before navigating
    } catch (error) {
      console.error("Error submitting OTP", error);
      toast.error("OTP verification failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6); // Allow only numeric input and limit to 6 characters
    setOtp(value);
  };

  const handleResendOtp = async () => {
    const Email = localStorage.getItem("publisheremail");

    if (!Email) {
      toast.error("Email not found. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsResendDisabled(true); // Disable resend button
    setResendTimer(60); // Reset countdown to 60 seconds

    try {
      const response = await axios.post(`${BASEURL}/auth/resend-otp`, {
        email: Email,
      });

      if (response?.data?.message) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error resending OTP", error);
      toast.error("Failed to resend OTP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleUpdateEmail = () => {
    try {
      toast.info("Redirecting to Update Email page...", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect to update email page
      navigate("/update-email"); // Update this route as per your application
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("Failed to navigate to Update Email. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100`}
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
          borderColor: "#FFFFFF",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "white", fontWeight: "600" }}>
          Verify OTP
        </h3>
        <p className="text-center" style={{ color: "white", marginBottom: "20px" }}>
          Enter the 6-digit code sent to your email
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center otp-input"
              value={otp}
              onChange={handleChange}
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
              cursor: "pointer",
            }}
          >
            Verify
          </button>
          <p className="text-center mt-3 resend-link text-white">
            Didn’t receive the code?{' '}
            <span
              className="bounce-link"
              style={{
                cursor: isResendDisabled ? 'not-allowed' : 'pointer',
              }}
              onClick={!isResendDisabled ? handleResendOtp : null}
            >
              {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend'}
            </span>
          </p>
          <p className="text-center mt-3">
            <button
              type="button"
              className="btn btn-outline-light w-100 mt-2"
              onClick={handleUpdateEmail}
            >
              Update Email
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PubOtpform;
