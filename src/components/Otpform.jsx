import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Otpform() {
  const [otp, setOtp] = useState('');
  const [animationClass, setAnimationClass] = useState('bounceIn-in');
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); 
  const [email, setEmail] = useState(localStorage.getItem('email') || ''); 
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger Entry Animation
    setAnimationClass('bounceIn-in');

    if (isResendDisabled) {
      // Start countdown for resend
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Countdown every second

      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [isResendDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setAnimationClass('bounceOut-out'); // Trigger exit animation

      // Check if email is available and not empty
      if (!email || email.trim() === '') {
        toast.error("Email is not found or empty. Please enter your email.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const response = await axios.post(`https://backend.crective.com/api/auth/verifyOTP`, {
        otp,
        email,  // Include email in the request body
      });

      if (response?.data?.message) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }

      setTimeout(() => navigate("/login"), 1000);  // Navigate after animation
    } catch (error) {
      console.error("Error submitting OTP", error);
      toast.error("OTP verification failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleChange = (e) => {
    // Only allow numeric input
    const value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleResend = async () => {
    if (!email || email.trim() === '') {
      toast.error("Email is not found or empty. Please enter your email to resend OTP.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsResendDisabled(true);
    setResendTimer(60); // Reset countdown to 60 seconds (1 minute)

    try {
      const response = await axios.post(`https://backend.crective.com/api/auth/user-resend-otp`, { email });

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
    // Redirect to update email page (can be a new page or modal)
    navigate("/update-email"); // Assuming you have an update email page
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 `}
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
          background: "#1F1D2C",
          borderColor: "#ffffff",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "white", fontWeight: "600" }}>
          Verify OTP
        </h3>
        <p className="text-center" style={{ color: "white", marginBottom: "20px" }}>
          Enter the 6-digit code sent to your email
        </p>

        {/* Show email to which OTP was sent */}
        <p className="text-center" style={{ color: "white", marginBottom: "20px" }}>
          OTP sent to: {email}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              maxLength="6"
              className="form-control text-center otp-input"
              value={otp}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btnn text-white w-100 mt-4"
            style={{
              border: "2px solid #fff", 
              borderRadius: "7px", 
              padding: "10px 0", 
            }}>
            Verify
          </button>
          <p className="text-center mt-3 resend-link text-white">
            Didn’t receive the code?{' '}
            <span
              className={`bounce-link ${isResendDisabled ? 'disabled' : ''}`}
              onClick={!isResendDisabled ? handleResend : null}
              style={{
                cursor: isResendDisabled ? 'not-allowed' : 'pointer', 
              }}
            >
              {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend'}
            </span>
          </p>

          {/* Add Update Email Button */}
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

export default Otpform;
