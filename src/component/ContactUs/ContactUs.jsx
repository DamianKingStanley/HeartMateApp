import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa"; // Importing the icons
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact">
      <section className="NewsLetter">
        <div className="sub">
          <h1>Subsribe To Our Newsletter</h1>
          <p>Stay in touch with us to get latest news and special offers.</p>
        </div>
        <div className="sendEmail">
          <input type="email" name="" id="" placeholder="your email address" />{" "}
          <br />
          <br />
          <button type="submit">Subscribe</button>
        </div>
      </section>
      <section className="info">
        <div>
          <h2>
            <FaMapMarkerAlt /> Address
          </h2>{" "}
          <p>57 Campbell Street ,Lagos Island</p>
        </div>
        <div>
          <h2>
            <FaPhone /> Call Us
          </h2>{" "}
          <p>090 810 90 810 </p>
        </div>
        <div>
          <h2>
            <FaEnvelope /> Email us
          </h2>{" "}
          <p>damianstanley76@gmail.com</p>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
