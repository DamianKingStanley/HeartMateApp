import React from "react";
import { FaUser, FaImages, FaMapMarkerAlt, FaComments } from "react-icons/fa";
import "./Steps.css";

const Steps = () => {
  return (
    <div className="Steps">
      <section className="StepsSection">
        <h1>HOW TO FIND A MATE</h1>
        <div className="step">
          <FaUser className="step-icon" />
          <h3>1. Start by Creating a Profile.</h3>
          <p>
            Authenticity is very crucial on BedMate. No one will take you
            seriously if you are not being real to yourself and to others. We do
            not discriminate and you have nothing to be ashamed of. If you are
            not ready to be real, you have no business being here.
          </p>
        </div>
        <div className="step">
          <FaImages className="step-icon" />
          <h3>2. Add your Lifestyle Photos</h3>
          <p>
            As part of being real to yourself and to others, it is important to
            add amazing photos of you. This way people will believe you are real
            and also know if you are the right one for them.
          </p>
        </div>
        <div className="step">
          <FaMapMarkerAlt className="step-icon" />
          <h3>3. Find a Mate</h3>
          <p>
            Use our filter to find available mates in your specific location.
            Tell us your current location and we will show you potential mates
            around you. If any is available and meet your spec standard, go
            ahead and contact them.
          </p>
        </div>
        <div className="step">
          <FaComments className="step-icon" />
          <h3>4. Connect with your Mate </h3>
          <p>
            Go ahead and call or chat with your newly found bedmate. Fix a date
            if you have to, a link up or a meet up
          </p>
        </div>
      </section>
    </div>
  );
};

export default Steps;
