import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASEURL } from "../Api";
import axios from "axios";
import { useCart } from "../CartContext";
import { toast } from "react-toastify";
import OrderSummary from "./OrderSummary";
import "../App.css"

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [postUrl, setPostUrl] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [useFileUpload, setUseFileUpload] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showUserForm, setShowUserForm] = useState(true);
  const [topic, setTopic] = useState("");
  const [wordLimit, setWordLimit] = useState("650");
  const [wordLimitPrice, setWordLimitPrice] = useState(0);

  const totalAmount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.adjustedPrice, 0)
    : 0;

  const handleWordLimitChange = (limit) => {
    let price = 0;
    if (limit === "650") price = 15;
    else if (limit === "750") price = 20;
    else if (limit === "850") price = 25;

    setWordLimit(limit);
    setWordLimitPrice(price);
  };

  const resetFields = () => {
    setPostUrl("");
    setSiteUrl("");
    setKeyWord("");
    setFile(null);
    setFileUrl("");
    setEmail("");
    setTopic("");
    setWordLimit("");
    setWordLimitPrice(0);
  };

  const handleTabChange = (isUserForm) => {
    setShowUserForm(isUserForm);
    resetFields();
  };

  const handleInitiateOrder = async (e) => {
    e.preventDefault();
    console.log("Initiating order process...");
    setLoading(true);
    setMessage("");

    // Check for authorization
    console.log("Checking user authorization...");
    if (!userId || !token) {
      console.error("Authorization failed: Missing userId or token.");
      setMessage("Authorization token is missing or malformed.");
      setLoading(false);
      return;
    }

    // Check if cart items are empty
    console.log("Validating cart items...");
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      console.error("Cart validation failed: Cart is empty.");
      setMessage("Your cart is empty.");
      setLoading(false);
      return;
    }
    console.log("Validating required fields...");
    if (showUserForm) {
      if (!keyWord || !email) {
        console.error("Field validation failed: Missing required fields for User Form.");
        setMessage("Please fill in all required fields.");
        setLoading(false);
        return;
      }
    } else {
      if (!topic || !siteUrl || !keyWord || !email || !wordLimit) {
        console.error("Field validation failed: Missing required fields for Publisher Form.");
        setMessage("Please fill in all required fields.");
        setLoading(false);
        return;
      }
    }
    if (useFileUpload && file) {
      console.log("Validating uploaded file...");
      const allowedFileTypes = [
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedFileTypes.includes(file.type)) {
        console.error(`Invalid file type: ${file.type}`);
        toast.error("Invalid file type! Please upload only PDF, DOC, or TEXT files.");
        setFile(null);
        setLoading(false);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        console.error(`File size too large: ${file.size} bytes`);
        toast.error("File is too large! Please upload a file smaller than 5MB.");
        setFile(null);
        setLoading(false);
        return;
      }
    }

    try {
      let uploadedFileUrl = fileUrl;
      if (useFileUpload && file) {
        console.log("Uploading file...");
        const formData = new FormData();
        formData.append("file", file);

        const fileUploadResponse = await axios.post(`${BASEURL}/orders/upload`, formData);
        console.log("File upload response:", fileUploadResponse);
        if (fileUploadResponse.status === 200 && fileUploadResponse.data?.url) {
          uploadedFileUrl = fileUploadResponse.data.url;
        } else {
          throw new Error("Error uploading the file.");
        }
      }

      // Prepare order data
      console.log("Preparing order data...");
      const orderData = cartItems.map((item) => ({
        userId,
        postUrl: showUserForm ? postUrl : null,
        keyWord,
        file: showUserForm ? uploadedFileUrl : null,
        email,
        topic: !showUserForm ? topic : "",
        wordLimit: !showUserForm ? +wordLimit : null,
        totalAmount,
        productId: item._id,
        quantity: item.quantity,
      }));

      console.log("Order data:", orderData);

      const apiUrl = showUserForm ? "/orders/place-order" : "/orders/content-place-order";
      console.log(`API URL: ${BASEURL}${apiUrl}`);
      console.log("Selected API URL:", `${BASEURL}${apiUrl}`);
      console.log("Request Payload:", orderData);

      const response = await axios.post(`${BASEURL}${apiUrl}`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Order placement response:", response);

      // Handle success response
      if ((response.status === 200 || response.status === 201) && response.data.orders) {
        const paymentUrl = response.data.orders[0]?.url;

        if (paymentUrl) {
          console.log("Redirecting to payment URL:", paymentUrl);
          window.location.href = paymentUrl;
          setCartItems([]);
          resetFields();
          localStorage.removeItem("cartItems");
        } else {
          throw new Error("Payment link not found in the response.");
        }
      } else {
        throw new Error("Error initiating the order.");
      }
    } catch (error) {
      console.error("Error occurred during order initiation:", error);
      setMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      console.log("Order process completed.");
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedFileTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (selectedFile) {
      if (!allowedFileTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type! Please upload only PDF, DOC, or TEXT files.");
        setFile(null);
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds the limit of 5MB.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <>

      <div className="container pt-5 mt-5">
        <div className="d-flex justify-content-left mb-4">
          <button
            className={`btn me-3 ${showUserForm ? "btn-outline" : "btn-outline"}`}
            onClick={() => handleTabChange(true)}
            type="button" 
            style={{
              backgroundColor: showUserForm ? '#E3652D' : 'transparent',
              color: showUserForm ? 'white' : '#E3652D',
              borderColor: '#E3652D',
            }}
            onFocus={(e) => e.target.style.borderColor = '#E3652D'} 
            onBlur={(e) => e.target.style.borderColor = '#E3652D'}
          >
            Content provided by yourself
          </button>

          <button
            className={`btn ${!showUserForm ? "btn-outline" : "btn-outline"}`}
            onClick={() => handleTabChange(false)}
            type="button" 
            style={{
              backgroundColor: !showUserForm ? '#E3652D' : 'transparent',
              color: !showUserForm ? 'white' : '#E3652D',
              borderColor: '#E3652D', 
            }}
            onFocus={(e) => e.target.style.borderColor = '#E3652D'} 
            onBlur={(e) => e.target.style.borderColor = '#E3652D'}
          >
            Content Written by us
          </button>
        </div>


        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-white px-3">
                <h5 className="mb-0">{showUserForm ? "User Details" : "Publisher Details"}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleInitiateOrder}>
                  {showUserForm ? (
                    <>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your note here"
                        value={keyWord}
                        onChange={(e) => setKeyWord(e.target.value)}
                        required
                      />
                      <div className="mb-3">
                        <label className="form-label">File or File URL</label>
                        <div className="d-flex align-items-center">
                          <input
                            type="radio"
                            id="uploadFile"
                            name="fileInputType"
                            checked={useFileUpload}
                            onChange={() => setUseFileUpload(true)}
                          />
                          <label htmlFor="uploadFile" className="ms-2 me-3">Upload File</label>
                          <input
                            type="radio"
                            id="typeUrl"
                            name="fileInputType"
                            checked={!useFileUpload}
                            onChange={() => setUseFileUpload(false)}
                          />
                          <label htmlFor="typeUrl" className="ms-2">Type URL</label>
                        </div>
                        {useFileUpload ? (
                          <input
                            id="fileInput"
                            type="file"
                            className="form-control mt-2"
                            onChange={handleFileChange}
                          />
                        ) : (
                          <input
                            type="url"
                            className="form-control mt-2"
                            placeholder="File URL"
                            value={fileUrl}
                            onChange={(e) => setFileUrl(e.target.value)}
                            required
                          />
                        )}
                      </div>
                      <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Backup Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                      />
                      <input
                        type="url"
                        className="form-control mb-3"
                        placeholder="Anchor Link"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Anchor"
                        value={keyWord}
                        onChange={(e) => setKeyWord(e.target.value)}
                        required
                      />
                      <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Backup Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="mb-3">
                        <label className="form-label">Word Limit</label>
                        <div className="d-flex">
                          {["650", "750", "850"].map((limit) => (
                            <div className="form-check me-3" key={limit}>
                              <input
                                type="radio"
                                id={`wordLimit${limit}`}
                                name="wordLimit"
                                value={limit}
                                checked={wordLimit === limit}
                                onChange={() => handleWordLimitChange(limit)}
                                className="form-check-input"
                              />
                              <label htmlFor={`wordLimit${limit}`} className="form-check-label">
                                {limit} words - EUR {limit === "650" ? 15 : limit === "750" ? 20 : 25}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <button
                    type="submit"
                    className="btn btnn text-white w-50"
                    style={{ backgroundColor: "#E3652D" }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <OrderSummary
            cartItems={cartItems}
            totalAmount={totalAmount + wordLimitPrice} 
            wordLimitPrice={wordLimitPrice}
            wordLimit={wordLimit}
          />

        </div>
      </div>
    </>
  );
};

export default Checkout;