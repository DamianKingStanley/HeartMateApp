import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <section className="FooterSection">
        <div>
          <ul>
            <h1>Legal</h1>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/rules">Rules</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <h1>Dating & Relationship Advice</h1>
            <li>
              <a href="#MatingTips"></a>
              <Link to="/dating-relationship-advice-tips">Mating Tips</Link>
            </li>

            <li>
              <a href="#relationshiptipsection"></a>
              <Link to="/dating-relationship-advice-tips">
                Relationship Advice
              </Link>
            </li>
            <li>
              <a href="#SingleLife">
                <Link to="/dating-relationship-advice-tips">Single Life</Link>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <h1>Connect with Admin</h1>
            <li>
              <Link to="">Facebook</Link>
            </li>
            <li>
              <Link to="">Twitter</Link>
            </li>
            <li>
              <Link to="">Instagram</Link>
            </li>
            <li>
              <Link to="">whatsApp</Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="footerWarn">
        <p>&copy; HeartMate 2024</p>
        <p>
          HEARTMATE DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON THE MEMBERS
          OR THE SUBSCRIBERS OF THIS WEBSITE. BEFORE YOU AGREE ON MEETING WITH
          ANYONE, MAKE SURE IT IS SOMEWHERE SAFE AND YOU CAN TRUST THAT PERSON.
          WE WILL NOT TAKE ANY RESPONSIBILITY FOR ANY MEMBER IF SOMETHING BAD
          SHOULD HAPPEN.
        </p>
      </section>
    </div>
  );
};

export default Footer;
