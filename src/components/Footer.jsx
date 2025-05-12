import React from "react";

function Footer() {
    return (
        <>
            <div
                style={{
                    backgroundColor: "#222",
                   padding: "20px",
                    color: "#999",
                }}
            >
                <div>
                        <div className="col-12 d-flex justify-content-between" style={{textAlign: "left"}}>
                            {/* Footer Text */}
                            <p className="footer-text" style={{ flex: 1 }}>
                                &copy; 2025 Spanish Guest Post. All rights reserved.
                            </p>

                            {/* Navigation Links */}
                            <div className="footer-links" style={{ flex: 1, textAlign: "right" }}>
                                <a href="/term-conditions" className="footer-link">Terms & Conditions</a>
                                <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
                            </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .footer-link {
                    font-size: 16px;
                    color: #E3652D;
                    text-decoration: none;
                    margin-left: 20px;
                    transition: all 0.3s ease-in-out;
                }

                .footer-link:hover {
                    color: #C64F24;
                    transform: scale(1.05);
                }

                .footer-text {
                    font-size: 16px;
                }

                @media (max-width: 768px) {
                    .footer-links {
                        margin-top: 10px;
                    }
                }
            `}</style>
        </>
    );
}

export default Footer;
