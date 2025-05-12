import React, { useState, useEffect } from "react";
import { BASEURL } from "../Api";
import axios from "axios";
import { toast } from 'react-toastify';


const Profile = () => {
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${BASEURL}/auth/updateProfile`,
        {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("error", response);

      if (response.status === 200) {
        toast.success(`Profile updated successfully!`, {
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
        setPasswordData({ currentPassword: "", newPassword: "" });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display the specific error message from the server
        toast.error(error.response.data.message || "An error occurred.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: "#BB2D3B",
          },
        });
      } else {
        // Handle other errors
        console.error("Error updating profile:", error);
        toast.error("Something went wrong. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: "#BB2D3B",
          },
        });
      }
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/auth/getProfile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.status === 200) {
          setProfileData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          });
        } else {
          console.error("Failed to fetch profile data", response);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      <div className="container py-5 my-5 bgcolor-primary" >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              padding: "50px",
              borderRadius: "8px",
              boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.15)",

              backgroundColor: "#fff",
            }}
          >
            <div className="row mb-5">
              <div className="col-12">
                <h2 className="mb-4 txt" style={{ color: "#243B55" }}>Profile Details</h2>
                <form onSubmit={handleSaveChanges}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter your first name"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter your last name"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                    />
                  </div>
                  {/* Change Password Section */}
                  <h2 className="my-4 txt" style={{ color: "#243B55" }}>Change Password</h2>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                      Current Password
                    </label>
                    <div className="input-group">
                      <input
                        type={currentPasswordVisible ? "text" : "password"}
                        className="form-control"
                        id="currentPassword"
                        placeholder="Enter your current password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleCurrentPasswordVisibility}
                        aria-label="Toggle password visibility"
                      >
                        <i
                          className={`fas ${currentPasswordVisible ? "fa-eye-slash" : "fa-eye"
                            }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <div className="input-group">
                      <input
                        type={newPasswordVisible ? "text" : "password"}
                        className="form-control"
                        id="newPassword"
                        placeholder="Enter a new password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleNewPasswordVisibility}
                        aria-label="Toggle password visibility"
                      >
                        <i
                          className={`fas ${newPasswordVisible ? "fa-eye-slash" : "fa-eye"
                            }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btnn text-white py-2"
                    style={{ backgroundColor: "#E3652D" }}
                  >
                    Save Changes
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
