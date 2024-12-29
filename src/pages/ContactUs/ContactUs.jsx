import React from "react";
import VismeForm from "../../pages/ContactUs/VismeForm";
import Navbar from "../../component/Navbar/Navbar";
import NavigationBar from "../../component/NavigationBar/NavigationBar";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contactus">
      <Navbar />
      <NavigationBar />
      <section>
        <VismeForm />
      </section>
    </div>
  );
};

export default ContactUs;
