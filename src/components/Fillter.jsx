import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import DataTable from "react-data-table-component";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion";
import LoginModal from "./LoginModel"
const FilterPage = () => {
  const { addToCart } = useCart();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [domainAuthorityRange, setDomainAuthorityRange] = useState([0, 100]);
  const [domainRatingRange, setDomainRatingRange] = useState([0, 100]);
  const [selectedOption, setSelectedOption] = useState("Select Niche");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxRating, setMaxRating] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [minDomainAuthority, setMinDomainAuthority] = useState(0);
  const [maxDomainAuthority, setMaxDomainAuthority] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const authToken = localStorage.getItem("authToken");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const handleLogin = () => {
    window.location.href = "/login"; 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (!authToken && page > 1) {
      alert("Please login to see more products.");
      window.location.href = "/login";
      setCurrentPage(1);
      return;
    }

    setCurrentPage(page);
  };

  useEffect(() => {
    if (products.length > 0) {
      const domainAuthorities = products.map((product) => product.domainAuthority || 0);
      setMaxDomainAuthority(Math.max(...domainAuthorities));
      setMinDomainAuthority(Math.min(...domainAuthorities));
      const prices = products.map((product) => product.adjustedPrice || 0);
      const ratings = products.map((product) => product.ratings || 0);
      setMaxPrice(Math.max(...prices));
      setMinPrice(Math.min(...prices));
      setMaxRating(Math.max(...ratings));
      setMinRating(Math.min(...ratings));
    }
  }, [products]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://backend.crective.com/api/products/products-by-country?country=Germany"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };
    fetchProducts();
  }, []);

  const applyFilter = () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // alert("Please log in first to apply the filter.");
      // window.location.href = "/login";
      setIsModalOpen(true); // Show modal if the user is not logged in
      return;
    }
    const filtered = products.filter(
      (product) =>
        product.adjustedPrice >= priceRange[0] &&
        product.adjustedPrice <= priceRange[1] &&
        product.ratings >= domainRatingRange[0] &&
        product.ratings <= domainRatingRange[1] &&
        product.domainAuthority >= domainAuthorityRange[0] &&
        product.domainAuthority <= domainAuthorityRange[1] &&
        (selectedOption === "Select Niche" || product.niche === selectedOption)
    );

    setFilteredProducts(filtered);
  };

  
  const clearFilter = () => {
    setPriceRange([0, 1000]);
    setDomainAuthorityRange([0, 100]);
    setDomainRatingRange([0, 100]);
    setSelectedOption("Select Niche");
    setSearchQuery("");
    setFilteredProducts(products);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const searchedProducts = products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(query)
      )
    );
    setFilteredProducts(searchedProducts);
  };

  const CategoriesCell = ({ categories }) => {
    const [showAll, setShowAll] = React.useState(false);

    // Split the categories string into an array
    const categoryList = categories[0] ? categories[0].split(",") : [];

    if (categoryList.length === 0) {
      return <span>N/A</span>;
    }

    const handleShowAll = () => {
      setShowAll(prevState => !prevState);
    };

    return (
      <div>
        {/* Show the first category */}
        <span>{categoryList[0]}
          {categoryList.length > 1 && (
            <span
              style={{
                background: "none",
                color: "#1976D2",
                border: "none",
                padding: "5px",
                cursor: "pointer",
                fontWeight: "700",
                textDecoration: "none",
                marginLeft: "1px",
                display: "inline-block",
              }}
              onClick={handleShowAll}
            >
              {showAll ? "Close" : `+${categoryList.length - 1}`}
            </span>
          )}
        </span>

        {/* Show all categories if "showAll" is true */}
        {showAll && (
          <div style={{ paddingTop: 5 }}>
            {categoryList.slice(1).map((category, index) => (
              <span key={index} style={{ display: "inline-block", marginRight: "10px" }}>
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const columns = [
    {
      name: "Website URL",
      cell: (row) => {
        const formatUrl = (url) => {
          if (!url) return "N/A";

          try {
            const parsedUrl = new URL(url);
            return parsedUrl.hostname;
          } catch (error) {
            return "Invalid URL";
          }
        };

        return (
          <div className="d-flex align-items-center text-primary" style={{ whiteSpace: "nowrap" }}>
            <i className="fas fa-link me-2 px-1"></i>
            {formatUrl(row.websiteUrl)}
          </div>
        );
      },
      sortable: true,
    },
    {
      name: "",
      cell: (row) => "",
      sortable: true,
    },
    {
      name: "DA",
      cell: (row) => row.domainAuthority,
      sortable: true,
    },
    {
      name: "DR",
      selector: (row) => row.ratings,
      sortable: true,
    },
    {
      name: "Monthly Traffic",
      selector: (row) => row.monthlyTraffic,
      sortable: true,
    },
    {
      name: "Categories",
      selector: (row) => row.Category,
      sortable: true,
      cell: (row) => <CategoriesCell categories={row.Category} />,

    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "Language",
      selector: (row) => row.language,
      sortable: true,
    },

    {
      name: "Currency",
      selector: (row) => row.Currency,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.adjustedPrice,
      sortable: true,
    },
    {
      name: "Sample link",
      cell: (row) => (
        <a href={row.Authorlink} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-link ms-2"></i>
        </a>
      ),
    },
    {
      name: "Live Time",
      cell: (row) => (
        <>
          <i className="fas fa-clock me-2 text-primary"></i>
          {row.LiveTime}
        </>
      ),
    },
    {
      name: "Turnaround Time",
      cell: (row) => (
        <>
          <i className="fas fa-clock px-1 text-success me-2"></i>
          {row.ApproxPublicationTime}
        </>
      ),
    },
    {
      name: "Add to Cart",
      selector: (row) => row.addToCart,
      cell: (row) => (
        <button
          type="button"
          className="btn btn-success btn-sm shadow-sm fixed-button"
          onClick={() => addToCart(row)}
        >
          <i className="fas fa-shopping-cart px-1"></i>Buy
        </button>
        
      ),
      style: {
        position: "sticky",
        right: "0px",
        background: "#fff",
        zIndex: "2",
      },
      headerStyle: {
        position: "sticky",
        right: "0px",
        top: "0px",
        background: "#fff",
        zIndex: "3",
      },
    },
  ];

  const motionContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <>
      <div style={{ width: "100%", backgroundColor: '#F7F7F7', paddingBottom: '10px' }}>
        <div className="container "
          style={{ paddingTop: '80px' }}
          id='sites'>
          <motion.div
            className="p-4 shadow-lg rounded"
            style={{ backgroundColor: "black", color: "white", overflow: "auto" }}
            initial="hidden"
            whileInView="visible"
            variants={motionContainerVariants}
          >
            <div className="row" style={{ height: "42vh" }}>
              <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                <div className="mb-4">
                  <h5 className="head">Price Range</h5>
                  <div className="d-flex justify-content-between">
                    <select
                      className="form-select rounded bg-light text-dark"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    >
                      <option value={minPrice}>Min (€{minPrice})</option>
                      {[...Array(11).keys()].map((i) => (
                        <option key={i} value={minPrice + (i * (maxPrice - minPrice)) / 10}>
                          €{minPrice + (i * (maxPrice - minPrice)) / 10}
                        </option>
                      ))}
                    </select>
                    <span className="px-2">to</span>
                    <select
                      className="form-select rounded bg-light text-dark"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    >
                      <option value={maxPrice}>Max (€{maxPrice})</option>
                      {[...Array(11).keys()].map((i) => (
                        <option key={i} value={minPrice + (i * (maxPrice - minPrice)) / 10}>
                          €{minPrice + (i * (maxPrice - minPrice)) / 10}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="head">Domain Rating Range</h5>
                  <div className="d-flex justify-content-between">
                    <select
                      className="form-select rounded bg-light text-dark"
                      value={domainRatingRange[0]}
                      onChange={(e) => setDomainRatingRange([Number(e.target.value), domainRatingRange[1]])}
                    >
                      <option value={minRating}>Min ({minRating})</option>
                      {[...Array(11).keys()].map((i) => (
                        <option key={i} value={minRating + (i * (maxRating - minRating)) / 10}>
                          {minRating + (i * (maxRating - minRating)) / 10}
                        </option>
                      ))}
                    </select>
                    <span className="px-2">to</span>
                    <select
                      className="form-select rounded bg-light text-dark"
                      value={domainRatingRange[1]}
                      onChange={(e) => setDomainRatingRange([domainRatingRange[0], Number(e.target.value)])}
                    >
                      <option value={maxRating}>Max ({maxRating})</option>
                      {[...Array(11).keys()].map((i) => (
                        <option key={i} value={minRating + (i * (maxRating - minRating)) / 10}>
                          {minRating + (i * (maxRating - minRating)) / 10}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 mt-4">
                <div className="mb-4">
                  <h5 className="head">Domain Authority Range</h5>
                  <div className="d-flex justify-content-between">
                    <select
                      className="form-select rounded bg-light text-dark"
                      value={domainAuthorityRange[0]}
                      onChange={(e) =>
                        setDomainAuthorityRange([
                          Number(e.target.value),
                          domainAuthorityRange[1],
                        ])
                      }
                    >
                      <option value={minDomainAuthority}>Min ({minDomainAuthority})</option>
                      {[...Array(11).keys()].map((i) => (
                        <option
                          key={i}
                          value={minDomainAuthority + (i * (maxDomainAuthority - minDomainAuthority)) / 10}
                        >
                          {minDomainAuthority + (i * (maxDomainAuthority - minDomainAuthority)) / 10}
                        </option>
                      ))}
                    </select>

                    <span className="px-2">to</span>

                    <select
                      className="form-select rounded bg-light text-dark"
                      value={domainAuthorityRange[1]}
                      onChange={(e) =>
                        setDomainAuthorityRange([
                          domainAuthorityRange[0],
                          Number(e.target.value),
                        ])
                      }
                    >
                      <option value={maxDomainAuthority}>Max ({maxDomainAuthority})</option>
                      {[...Array(11).keys()].map((i) => (
                        <option
                          key={i}
                          value={minDomainAuthority + (i * (maxDomainAuthority - minDomainAuthority)) / 10}
                        >
                          {minDomainAuthority + (i * (maxDomainAuthority - minDomainAuthority)) / 10}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="head">Niche</h5>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="form-select shadow-sm rounded bg-light text-dark"
                  >
                    <option value="">Select Niche</option>
                    {products && products.length > 0 &&
                      Array.from(new Set(products.map((product) => product.niche)))
                        .map((niche, index) => (
                          <option key={index} value={niche}>
                            {niche}
                          </option>
                        ))
                    }
                  </select>
                </div>

                <div className="mt-2 text-center">
                  <button
                    type="button"
                    className="btn rounded px-4 py-2 me-3 mt-4"
                    onClick={applyFilter}
                    style={{
                      backgroundColor: "white", border: "none",
                      color: "#000000",
                      fontWeight: "500"
                    }}
                  >
                    Apply Filter
                  </button>
                  <LoginModal
                    show={isModalOpen}
                    onClose={handleCloseModal}
                    onLogin={handleLogin}
                  />
                  <button
                    type="button"
                    className="btn rounded px-4 py-2 mt-4"
                    onClick={clearFilter}
                    style={{
                      color: "#000000",
                      backgroundColor: 'white',
                      fontWeight: "500",
                    }}
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>


          </motion.div>
          <div
            className="row py-3"
            style={{
              borderRadius: "8px",
              marginTop: "30px",
              marginBottom: "30px",
              boxShadow: "0px 0px 8px 4px rgba(0,0,0,0.1)"
            }}
          >
            {/* Left Empty Section */}
            <div className="col-md-8 col-lg-8 col-12"></div>
            <motion.div
              className="col-md-3 col-lg-3 col-12 offset-md-1 offset-lg-1"
              initial="hidden"
              whileInView="visible"
              variants={motionContainerVariants}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* Search Input */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{
                    overflow: "hidden",
                    border: "none",
                    padding: "12px 45px 12px 16px",
                    borderRadius: "0",
                    boxShadow: "inset 0 2px 2px rgba(0, 0, 0, 0.1)",
                    fontSize: "16px",
                    width: "100%",
                  }}
                />

                {/* Search Icon */}
                <i
                  className="fas fa-search"
                  style={{
                    position: "absolute",
                    right: "16px",
                    color: "#888",
                    fontSize: "18px",
                    pointerEvents: "none",
                  }}
                ></i>
              </div>
            </motion.div>


            <motion.div
              className="row mt-4 m-0"
              initial="hidden"
              whileInView="visible"
              variants={motionContainerVariants}
              style={{ minHeight: "300px" }}
            >
              <div className="col-lg-12 col-md-12 col-12">
                <div
                  style={{ whiteSpace: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis', height: "100%" }}>
                  <DataTable
                    columns={columns}
                    data={filteredProducts}
                    pagination
                    highlightOnHover
                    responsive
                    paginationPerPage={10}
                    paginationDefaultPage={currentPage}
                    onChangePage={handlePageChange}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPage;