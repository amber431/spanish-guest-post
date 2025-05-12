import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
function TermsAndConditions() {
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "auto",
      padding: "20px",
    },
    card: {
      backgroundColor: "#FFFFFF", 
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#E3652D",
      marginBottom: "20px",
    },
    subHeading: {
      fontSize: "18px",
      fontWeight: "bold",
      marginTop: "20px",
      color: "#333", 
    },
    paragraph: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#555", 
    },
    list: {
      listStyleType: "disc",
      marginLeft: "20px",
    },
    contactInfo: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#E3652D", 
    },
  };
  return (
    <>
    < Navbar />
      <div style={{ backgroundColor: "#F9FBFD", padding: "80px" }}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h2 style={styles.heading}>Terms and Conditions</h2>
            <p style={styles.paragraph}>
              Welcome to [Your Application Name]! These Terms and Conditions
              govern your use of our guest post application. By accessing or
              using the application, you agree to comply with these terms.
            </p>
            <h4 style={styles.subHeading}>1. Use of the Application</h4>
            <p style={styles.paragraph}>
              You agree to use the application only for lawful purposes and in
              a manner that does not infringe the rights of, restrict, or
              inhibit the use of the application by others.
            </p>
            <h4 style={styles.subHeading}>2. Guest Post Submissions</h4>
            <p style={styles.paragraph}>
              When submitting guest posts, you agree to:
              <ul style={styles.list}>
                <li>Ensure all content is original and does not violate copyrights or trademarks.</li>
                <li>Avoid submitting any offensive, defamatory, or unlawful material.</li>
                <li>Provide accurate and complete information when required.</li>
              </ul>
            </p>
            <h4 style={styles.subHeading}>3. Intellectual Property</h4>
            <p style={styles.paragraph}>
              All content, trademarks, and logos provided on this application
              are the intellectual property of [Your Application Name] or its
              licensors. You may not use, copy, or distribute any material
              without prior written consent.
            </p>
            <h4 style={styles.subHeading}>4. Limitation of Liability</h4>
            <p style={styles.paragraph}>
              We are not liable for any indirect, incidental, or consequential
              damages arising from your use of the application. The application
              is provided "as is" without any warranties of any kind.
            </p>
            <h4 style={styles.subHeading}>5. Termination</h4>
            <p style={styles.paragraph}>
              We reserve the right to terminate or suspend your access to the
              application at any time without notice if you violate these
              Terms and Conditions.
            </p>
            <h4 style={styles.subHeading}>6. Governing Law</h4>
            <p style={styles.paragraph}>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of [Your Jurisdiction].
            </p>
            <h4 style={styles.subHeading}>7. Contact Us</h4>
            <p style={styles.paragraph}>
              If you have any questions about these Terms and Conditions, please contact us at:
              <br />
              <strong style={styles.contactInfo}>Email:</strong> support@yourdomain.com
            </p>
          </div>
        </div>
      </div>
      < Footer />
    </>
  );
}
export default TermsAndConditions;