import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

function PrivacyPolicy() {
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "auto",
      padding: "20px",
    },
    card: {
      backgroundColor: "#ffffff", 
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
    footer: {
      textAlign: "center",
      backgroundColor: "#28a745", 
      color: "#fff", 
      padding: "20px",
      borderRadius: "8px",
      marginTop: "30px",
    },
    footerLinks: {
      color: "#fff",
      textDecoration: "none",
      marginRight: "15px",
      fontWeight: "bold",
    },
    footerText: {
      fontSize: "14px",
      color: "#fff",
      marginTop: "10px",
    },
  };

  return (
<>
<Navbar />
<div style={{backgroundColor:"#f9fbfd", padding:"80px"}}>
<div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Privacy Policy</h2>
        <p style={styles.paragraph}>
          At [Your Application Name], we value your privacy. This Privacy
          Policy explains how we collect, use, and protect your personal
          information when you use our guest post application.
        </p>

        <h4 style={styles.subHeading}>1. Information We Collect</h4>
        <p style={styles.paragraph}>
          We collect the following types of information:
          <ul style={styles.list}>
            <li>
              <strong>Personal Information:</strong> When you apply for guest
              posting, we may ask for your name, email address, and website
              details.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about how you
              use the application, such as IP addresses, device type, and
              browsing behavior.
            </li>
          </ul>
        </p>

        <h4 style={styles.subHeading}>2. How We Use Your Information</h4>
        <p style={styles.paragraph}>
          We use your information for the following purposes:
          <ul style={styles.list}>
            <li>To review and process your guest post application.</li>
            <li>To improve the user experience of the application.</li>
            <li>To send you updates regarding your application status or any other relevant information.</li>
          </ul>
        </p>

        <h4 style={styles.subHeading}>3. Data Protection</h4>
        <p style={styles.paragraph}>
          We take the security of your personal information seriously and implement various security measures to protect your data from unauthorized access, alteration, or destruction.
        </p>

        <h4 style={styles.subHeading}>4. Sharing Your Information</h4>
        <p style={styles.paragraph}>
          We do not sell or rent your personal information to third parties. However, we may share your data in the following circumstances:
          <ul style={styles.list}>
            <li>To comply with legal obligations.</li>
            <li>To protect the rights and safety of our users and the application.</li>
          </ul>
        </p>

        <h4 style={styles.subHeading}>5. Cookies</h4>
        <p style={styles.paragraph}>
          Our application uses cookies to enhance your experience. Cookies are small files stored on your device that help us analyze user behavior and improve our services.
        </p>

        <h4 style={styles.subHeading}>6. Your Rights</h4>
        <p style={styles.paragraph}>
          You have the right to:
          <ul style={styles.list}>
            <li>Access, update, or delete your personal information.</li>
            <li>Withdraw consent at any time if you no longer wish to receive communications from us.</li>
          </ul>
        </p>

        <h4 style={styles.subHeading}>7. Changes to this Privacy Policy</h4>
        <p style={styles.paragraph}>
          We reserve the right to update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
        </p>

        <h4 style={styles.subHeading}>8. Contact Us</h4>
        <p style={styles.paragraph}>
          If you have any questions or concerns about our privacy policy, please contact us at:
          <br />
          <strong style={styles.contactInfo}>Email:</strong> support@yourdomain.com
        </p>
      </div>
    </div>
</div>
<Footer />
</>
  );
}

export default PrivacyPolicy;
