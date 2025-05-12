import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Navbar from "./Navbar";
import axios from "axios";
import { BASEURL } from "../Api.jsx";

function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [invoiceSearch, setInvoiceSearch] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        // Make API request with the token in the headers
        const response = await axios.get(
          `${BASEURL}/orders/get-user-Invoices`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data && response.data.invoices) {
          setInvoices(response.data.invoices);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized! Please check your auth token.");
        }
      }
    };

    fetchInvoices();
  }, []);

  // Columns for the invoice table
  const invoiceColumns = [
    {
      name: "Order Number",
      selector: (row) => row.orderNumber,
      sortable: true,
    },
    { name: "Invoice Number", selector: (row) => row.invoiceNumber, sortable: true },
    { name: "Amount", selector: (row) => `$${row.amount}`, sortable: true },
    { name: "Currency", selector: (row) => row.currency, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  // Filter function for the invoice table
  const filteredInvoiceData = invoices.filter(
    (row) =>
      (row.orderNumber &&
        row.orderNumber.toLowerCase().includes(invoiceSearch.toLowerCase())) ||
      (row.invoiceNumber &&
        row.invoiceNumber.toLowerCase().includes(invoiceSearch.toLowerCase())) ||
      (row.status && row.status.toLowerCase().includes(invoiceSearch.toLowerCase()))
  );

  return (
    <>
      <div className="container mt-5">
        <h2 className="txt">Invoices</h2>
        <p className="text-muted">
          An overview of all your invoices fetched from the API.
        </p>

        <div className="row mt-5">
          <div className="col-md-12 col-12">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0 txt">Invoices</h5>
                <input
                  type="text"
                  className="form-control w-auto"
                  placeholder="Search invoices..."
                  value={invoiceSearch}
                  onChange={(e) => setInvoiceSearch(e.target.value)}
                />
              </div>
              <div className="card-body">
                <DataTable
                  columns={invoiceColumns}
                  data={filteredInvoiceData}
                  pagination
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
