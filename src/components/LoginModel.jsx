const LoginModal = ({ show, onClose, onLogin }) => {
    if (!show) return null;
  
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
            color: 'black'
          }}
        >
          <h5>Login Required</h5>
          <p>Please log in to apply the filter.</p>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={onLogin}
              style={{
                backgroundColor: "#E3652D",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              Login
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    );
  };
export default LoginModal  