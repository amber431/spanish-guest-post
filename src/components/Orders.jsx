import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { BASEURL } from "../Api";

const Orders = () => {
  const [alluserorders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); 
  const token = localStorage.getItem("authToken");

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark"; 
      case "Rejected":
        return "bg-danger"; 
      case "Accepted":
        return "bg-success"; 
      default:
        return "bg-secondary"; 
    }
  };
  
  useEffect(() => {
    console.log("Fetching orders...");
    const allUserOrders = async () => {
      try {
        const response = await axios.get(`${BASEURL}/orders/all-user-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response,"server response");
        
        if (response.data && response.data.userOrders) {
          const flattenedOrders = response.data.userOrders.flatMap((userOrders) =>
            userOrders.orders.map((order) => ({
              ...order,
              productName: order.productName
              ,
            }))
          );
          setOrders(flattenedOrders);} else {
          console.error("Error response status:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    allUserOrders();
  }, [token]);
  console.log("allord",alluserorders);
  

  useEffect(() => {
    console.log("Current Orders State:", alluserorders);
  }, [alluserorders]);
console.log("all order",alluserorders);



  // Filter orders based on search query and selected status
  const filteredOrders = Array.isArray(alluserorders)
    ? alluserorders.filter((order) => {
      const searchTerm = searchQuery.toLowerCase();
      const statusMatches = selectedStatus
        ? order.orderStatus.toLowerCase() === selectedStatus.toLowerCase()
        : true;

      const searchMatches =
        (order.product && order.product.toLowerCase().includes(searchTerm)) ||
        (order.user && order.user.toLowerCase().includes(searchTerm)) ||
        (order.email && order.email.toLowerCase().includes(searchTerm)) ||
        (order.siteUrl && order.siteUrl.toLowerCase().includes(searchTerm)) ||
        (order.postUrl && order.postUrl.toLowerCase().includes(searchTerm)) ||
        (order.keyWord && order.keyWord.toLowerCase().includes(searchTerm)) ||
        (order.file && order.file.toLowerCase().includes(searchTerm)) ||
        (order.totalAmount &&
          order.totalAmount.toString().includes(searchTerm)) ||
        (order.orderStatus &&
          order.orderStatus.toLowerCase().includes(searchTerm)) ||
        (order.createdAt &&
          new Date(order.createdAt).toLocaleDateString().includes(searchTerm));

      return statusMatches && searchMatches;
    })
    : []; 

  const statusList = [
    ...new Set(alluserorders.map((order) => order.orderStatus)),
  ];

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row._id || "N/A",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
    },
    {
      name: "Site URL",
      selector: (row) => (
        <a href={row.siteUrl} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-home"></i>
        </a>
      ) || "N/A",
      sortable: true,
    },
    {
      name: "Post URL",
      selector: (row) => (
        <a href={row.postUrl} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-link-slash" />
        </a>
      ) || "N/A",
      sortable: true,
    },
    {
      name: "Keyword",
      selector: (row) => row.keyWord || "N/A",
      sortable: true,
    },
    {
      name: "File Link",
      selector: (row) => (
        <a href={row.file} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-file-lines" />
        </a>
      ) || "N/A",
      sortable: true,
    },
    {
      name: "Payment ($)",
      selector: (row) => row.totalAmount || "N/A",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge rounded-pill ${getStatusBadgeClass(row.orderStatus)}`}
        >
          {row.orderStatus || "N/A"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          day: 'numeric',
          month: 'long',

        }) || "N/A",
      sortable: true,
    },

  ];

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const getOptionTextColor = (status) => {
    switch (status) {
      case "Cancelled":
        return { color: "red" };
      case "Pending":
        return { color: "orange" };
      case "In Progress":
        return { color: "green" };
      case "Completed":
        return { color: "blue" };
      default:
        return { color: "black" };
    }
  };

  return (
    <div>
      <div className="container mt-5 mb-5 pt-5">
        <div className="card p-4 shadow-lg rounded">
          <div className="row py-2">
            <h5 className="text-uppercase txt">Your Orders</h5>
          </div>
          <div className="row py-2 ">
            <div className="col-md-2 col-lg-2 col-12">
              <select
                id="order-status"
                className="form-select"
                aria-label="Order Status Select"
                value={selectedStatus}
                onChange={handleStatusChange}
                style={{
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #ced4da", 
                  borderRadius: "8px", 
                  padding: "10px 12px", 
                  fontSize: "16px", 
                  color: "#495057",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)", 
                  transition: "box-shadow 0.2s ease-in-out", 
                  outline: "none", 
                  cursor: "pointer", 
                  appearance: "none", 
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" viewBox="0 0 16 16"><path d="M1.5 6.5l6 6 6-6h-12z"/></svg>')`, 
                  backgroundRepeat: "no-repeat", 
                  backgroundPosition: "right 12px center", 
                  backgroundSize: "16px", 
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0px 2px 8px rgba(0, 0, 0, 0.1)")}
                onBlur={(e) => (e.target.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.05)")} 
              >
                <option value="">All Orders</option>
                {statusList.map((status, index) => (
                  <option
                    key={index}
                    value={status}
                    style={{
                      color: status === "Pending" ? "orange" : status === "Completed" ? "green" : "black", 
                    }}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2 col-lg-2 col-12">
            </div>

            <div className="col-md-5 col-lg-5 col-12"></div>
            <div className="col-md-3 col-lg-3 col-12" style={{
              position: "relative",
              display: "flex",
              alignItems: "center",

            }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none", 
                  padding: "12px 16px", 
                  borderRadius: "8px",
                  boxShadow: "0px 0px 0px 4px rgba(0, 0, 0, 0.03)", 
                  fontSize: "16px", 
                  width: "100%", 
                  overflow: "hidden", 
                }}
              />
              <i
                className="fas fa-search"
                style={{
                  position: "absolute",
                  right: "22px", 
                  color: "#888", 
                  fontSize: "18px",
                  pointerEvents: "none",
                }}
              ></i>
            </div>
          </div>
          <div className="row py-5">
            <div className="col-lg-12 col-md-12 col-12">
              <DataTable
                columns={columns}
                data={filteredOrders}
                pagination
                highlightOnHover
                responsive
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
