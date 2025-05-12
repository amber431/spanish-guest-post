import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../Api";
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import Select from "react-select";
import countries from "../countries.js";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const SignUp = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phonePrefix, setPhonePrefix] = useState("");
  const [isBuyer, setIsBuyer] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currency, setCurrency] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [numberOfSites, setNumberOfSites] = useState("");
  const [doYouOwnSite, setDoYouOwnSite] = useState("");
  const [doFollowLinks, setDoFollowLinks] = useState("");
  const [alreadySellingArticles, setAlreadySellingArticles] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [ownSites, setOwnSites] = useState("");
  const [products, setProducts] = useState([]);
  const [animationClass, setAnimationClass] = useState("fadeIn");
  const [sellingArticles, setSellingArticles] = useState(""); 
  const [sellingUrl, setSellingUrl] = useState("");
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    // Trigger Entry Animation
    setAnimationClass('bounceIn-in');
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${BASEURL}/products/all_products?userId=${localStorage.getItem("userId")}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };
    fetchProducts();
  }, []);
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      setPasswordError("Password is required.");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };
  const countryOptions = countries.map((country) => ({
    value: country.code, // Country code (e.g., "US")
    label: country.name, // Display flag and country name
    phonePrefix: country.dial_code, // Dial code
    currency: country.currency || "", // Currency (can add a field in countries.js)
  }));

  // Handle country change (update phone prefix and currency)
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setCountry(selectedOption.label); // Country name ko set karein
    setPhoneNumber(""); // Reset phone number when country changes
    setCurrency(selectedOption.currency); // Set the selected country's currency
  };
  const currencyOptions = [
    { value: "USD", label: "USD - Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - Pound" },
  ];

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value); // Set the selected currency
  };

  const fullPhoneNumber = selectedCountry?.phonePrefix ? selectedCountry.phonePrefix + phoneNumber : phoneNumber;

  const resetFields = () => {

    setEmail("");
    setPassword("");
    setCountry("");
    setPhoneNumber("");
    setBusinessName("");
    setFirstName("");
    setLastName("");
    setBusinessType("");
    setCurrency("");
    setMonthlyBudget("");
    setNumberOfSites("");
    setDoFollowLinks("");
    setOwnSites("");
    setSellingArticles("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError || !password) {
      toast.error("Please enter a strong password.");
      return;
    }

    try {
      // Define role based on user type
      const role = isBuyer ? "user" : "publisher";

      // Create payload
      const payload = {
        password,
        country,
        phoneNumber: fullPhoneNumber,
        businessName,
        role,
        currency,
        email,
        firstName,
        lastName,
      };

      // Add extra fields based on user type
      if (isBuyer) {
        Object.assign(payload, {
          businessType,
          monthlyBudget,
        });
      } else {
        Object.assign(payload, {
          numberOfSites,
          doFollowLinks,
          ownSites,
          sellingArticles,
        });

        // Only add sellingArticlesUrl if sellingArticles is "yes"
        if (sellingArticles === "yes") {
          payload.sellingArticlesUrl = sellingUrl;
        }
      }

      // Save email to localStorage based on role
      if (email) {
        if (role === "user") {
          localStorage.setItem("email", email);
          localStorage.setItem("role", "user");
        } else if (role === "publisher") {
          localStorage.setItem("publisheremail", email);
          localStorage.setItem("role", "publisher");
        }
      } else {
        throw new Error("Email is required.");
      }

      // API Endpoint
      const endpoint = isBuyer
        ? `${BASEURL}/auth/register-user`
        : `${BASEURL}/auth/register-publisher`;

      // API Call
      const response = await axios.post(endpoint, payload);

      // Handle success
      if (response.data && response.data.message) {
        toast.success(`${response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: "#2A3855",
          },
        });

        // Navigate based on role
        if (role === "user") {
        
          navigate("/verify-otp");
        } else if (role === "publisher") {
          navigate("/verify-pubotp");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    
    <div className=" d-flex justify-content-center h-auto"
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
        className={`card p-4 shadow-lg mt-5 mb-5  ${animationClass}`}
        style={{
          maxWidth: "700px",
          width: "100%",
          borderRadius: "15px",
          borderColor: "#ffffffff",
          background: "linear-gradient(to right, #1F1D2C, #38251D)",
          color: "#fff",
        }}
      >
        <h4
          className="text-center mb-4"
          style={{ color: "#FFFFFFF", fontWeight: "700" }}
        >
          Create Your Account
        </h4>
        <div
          className="d-flex justify-content-center align-items-center mb-4"
          style={{ gap: "10px" }}
        >
          <button
            className={`btn btn-lg toggle-button`}
            onClick={() => {
              setIsBuyer(true);
              resetFields();
            }}
            style={{
              backgroundColor: isBuyer ? "#007bff" : "#2dce65", 
              color: "#fff",
              borderRadius: "20px",
              padding: "10px 20px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              borderColor: "transparent",
            }}
          >
            <i
              className="fa-solid fa-star"
              style={{ marginRight: "8px", fontSize: "18px" }}
            ></i>
            Buyer
          </button>

          <button
            className={`btn btn-lg toggle-button`}
            onClick={() => setIsBuyer(false)}
            style={{
              backgroundColor: !isBuyer ? "#E3652D" : "#2dce65", 
              color: "#fff",
              borderRadius: "20px",
              padding: "10px 20px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              borderColor: "transparent",
            }}
          >
            <i
              className="fa-solid fa-tag"
              style={{ marginRight: "8px", fontSize: "18px" }}
            ></i>
            Seller
          </button>
        </div>


        <form onSubmit={handleSubmit} disabled={passwordError}   >
          {/* Buyer Form Fields */}
          {isBuyer && (
            <>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Password <span style={{ color: "red" }}>*</span></label>
                    <div className="input-group" style={{ position: "relative" }}>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        style={{
                          backgroundColor: "#233447",
                          color: "#fff",
                          borderColor: "#ffffff",
                          paddingRight: "35px",
                        }}
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "black",
                        }}
                      >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {passwordError && <p style={{ color: "red", fontSize: "12px" }}>{passwordError}</p>}
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Business Name <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Business Name"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Business Type <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={businessType}
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      onChange={(e) => setBusinessType(e.target.value)}
                      placeholder="Business Type"
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                {/* Country Select Field */}
                <div className="col-md-6" style={{ maxWidth: '100%' }}>
                  <div className="form-group">
                    <label>Country</label>
                    <Select
                      options={countryOptions}
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      placeholder="Select Country"
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#233447",
                          color: "#fff",
                          border: "1px solid #ffffff",
                          borderRadius: "5px",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#233447",
                          borderRadius: "5px",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "#fff", 
                        }),
                        option: (base, state) => ({
                          ...base,
                          color: "#fff", 
                          backgroundColor: state.isSelected ? "#1e2a3a" : state.isFocused ? "#333f51" : "#233447",
                          padding: "10px",
                          borderRadius: "5px",
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        style={{
                          backgroundColor: "#233447",
                          color: "#fff",
                          border: "1px solid #ffffff",
                          borderRadius: "5px",
                        }}
                      >
                        {selectedCountry?.phonePrefix || "+"}
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your phone number"
                        style={{
                          backgroundColor: "#233447",
                          color: "#fff",
                          border: "1px solid #ffffff",
                          borderRadius: "5px",
                        }}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Currency <span style={{ color: "red" }}>*</span></label>
                    <Select
                      value={currencyOptions.find(option => option.value === currency)} 
                      onChange={handleCurrencyChange}
                      options={currencyOptions}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "#233447",
                          color: "#fff",
                          borderColor: "#ffffff",
                          borderRadius: "5px",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#fff",
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: "#fff",
                        }),
                        indicatorSeparator: (provided) => ({
                          ...provided,
                          backgroundColor: "#fff",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected ? "#1e2a3a" : state.isFocused ? "#333f51" : "#233447",
                          color: state.isSelected ? "#fff" : "#b0b0b0",
                          padding: "10px",
                          borderRadius: "5px",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#233447", 
                          borderRadius: "5px",
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>


            </>
          )}

          {/* Seller Form Fields */}
          {!isBuyer && (
            <>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label >
                      Last Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="form-group">
                    <label >
                      Contact Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label >
                      Business Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      placeholder="Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                {/* Country Select Field */}
                <div className="col-md-6" style={{ maxWidth: '100%' }}>
                  <div className="form-group">
                    <label>Country</label>
                    <Select
                      options={countryOptions}
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      placeholder="Select Country"
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#233447",
                          color: "#fff",
                          border: "1px solid #ffffff",
                          borderRadius: "5px",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#233447",
                          borderRadius: "5px",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "#fff",
                        }),
                        option: (base, state) => ({
                          ...base,
                          color: "#fff",  
                          backgroundColor: state.isSelected ? "#1e2a3a" : state.isFocused ? "#333f51" : "#233447",
                          padding: "10px",
                          borderRadius: "5px",
                        }),
                      }}
                    />
                  </div>
                </div>
                {/* Phone Number */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        style={{
                          backgroundColor: "#233447",
                          color: "#fff",
                          border: "1px solid #ffffff",
                          borderRadius: "5px",
                        }}
                      >
                        {selectedCountry?.phonePrefix || "+"}
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter your phone number"
                        style={{
                          backgroundColor: "#233447",
                          color: "#fff",
                          border: "1px solid #ffffff",
                          borderRadius: "5px",
                        }}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Currency <span style={{ color: "red" }}>*</span></label>
                    <Select
                      value={currencyOptions.find(option => option.value === currency)} 
                      onChange={handleCurrencyChange}
                      options={currencyOptions}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "#233447",
                          color: "#fff",
                          borderColor: "#ffffff",
                          borderRadius: "5px",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#fff",
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: "#fff",
                        }),
                        indicatorSeparator: (provided) => ({
                          ...provided,
                          backgroundColor: "#fff",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected ? "#1e2a3a" : state.isFocused ? "#333f51" : "#233447",
                          color: state.isSelected ? "#fff" : "#b0b0b0",
                          padding: "10px",
                          borderRadius: "5px",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#233447", 
                          borderRadius: "5px",
                        }),
                      }}
                    />
                  </div>
                </div>

                {/* Number of Sites Input Field */}
                <div className="col-md-6">
                  <div className="form-group mt-2">
                    <label>
                      Number of Sites <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Number of Sites"
                      style={{
                        backgroundColor: "#233447",
                        color: "#fff",
                        border: "1px solid #ffffff",
                        borderRadius: "5px",
                      }}
                      value={numberOfSites}
                      onChange={(e) => setNumberOfSites(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>
                      Password <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={passwordVisible ? "text" : "password"} 
                        className="form-control"
                        placeholder="Password"
                        style={{
                          backgroundColor: "#233447",
                          color: "#fff",
                          borderColor: "#ffffff",
                        }}
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                      <span
                        className="input-group-text"
                        onClick={() => setPasswordVisible(!passwordVisible)} 
                        style={{ cursor: "pointer" }}
                      >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {passwordError && (
                      <p style={{ color: "red", fontSize: "12px" }}>{passwordError}</p>
                    )}
                  </div>

                </div>
              </div>

              <div className="form-group mt-2">
                <label>
                  Does your site have do-follow links? <span style={{ color: "red" }}>*</span>
                </label>
                <div>
                  <label style={{ marginRight: "15px" }}>
                    <input
                      type="radio"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      name="doFollowLinks"
                      value="yes"
                      onChange={(e) => setDoFollowLinks(e.target.value)}
                    />
                    Yes
                  </label>
                  <label style={{ marginRight: "15px" }}>
                    <input
                      type="radio"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      name="doFollowLinks"
                      value="no"
                      onChange={(e) => setDoFollowLinks(e.target.value)}
                    />
                    No
                  </label>
                  <label>
                    <input
                      type="radio"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      name="doFollowLinks"
                      value="both"
                      onChange={(e) => setDoFollowLinks(e.target.value)}
                    />
                    Both
                  </label>
                </div>
              </div>

              <div className="form-group mt-2">
                <label>
                  Do you own the sites? <span style={{ color: "red" }}>*</span>
                </label>
                <div>
                  <label style={{ marginRight: "15px" }}>
                    <input
                      type="radio"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      name="ownSites"
                      value="yes"
                      onChange={(e) => setOwnSites(e.target.value)}
                    />
                    Yes
                  </label>
                  <label style={{ marginRight: "15px" }}>
                    <input
                      type="radio"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      name="ownSites"
                      value="no"
                      onChange={(e) => setOwnSites(e.target.value)}
                    />
                    No
                  </label>
                  <label>
                    <input
                      type="radio"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      name="ownSites"
                      value="both"
                      onChange={(e) => setOwnSites(e.target.value)}
                    />
                    Both
                  </label>
                </div>
              </div>
              <div className="form-group mt-2">
                <label>
                  Are you already selling articles? <span style={{ color: "red" }}>*</span>
                </label>
                <div>
                  <label style={{ marginRight: "15px" }}>
                    <input
                      type="radio"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      name="sellingArticles"
                      value="yes"
                      onChange={(e) => setSellingArticles(e.target.value)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                      name="sellingArticles"
                      value="no"
                      onChange={(e) => setSellingArticles(e.target.value)}
                    />
                    No
                  </label>
                </div>
                {sellingArticles === "yes" && (
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          If yes, add the URL where you are selling your articles:{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="Enter the URL"
                          style={{ backgroundColor: "#233447", color: "#fff", borderColor: "#ffffff" }}
                          value={sellingUrl}
                          onChange={(e) => setSellingUrl(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "15px",
              // gap: "10px",
            }}
          >
            <button
              type="submit"
              className="btn w-50"
              style={{
                backgroundColor: "#E3652D",
                borderColor: "#ffffffff",
                color: "#fff",
                fontWeight: "600",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              Sign Up
            </button>
            <p style={{ color: "white", fontSize: "16px", marginRight: "20px" }}>
              If you have an account:
              <NavLink
                to="/login"
                style={{
                  color: "#E3652D",
                  fontWeight: "bold",
                  textDecoration: "none",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              >
                SignIn
              </NavLink>
            </p>
          </div>

        </form>
      </div>
    </div >
  );
};
export default SignUp;