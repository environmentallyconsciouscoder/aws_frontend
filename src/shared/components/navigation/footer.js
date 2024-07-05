import React from "react";
import Logo from "../../../image/green_kode_white.svg";
import {
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <div className="footer__addressAndLogo">
          <img className="footer__logo" src={Logo} alt="logo" />
          <p className="footer__address">
            Launchpad Falmouth University <br /> Penryn Campus
            <br /> Treliever Road <br /> Penryn
            <br />
            Cornwall <br /> TR10 9FE
          </p>
        </div>
        <div className="footer__contact">
          <p className="footer__contactHeader--style">Contact us</p>
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <a
              className="footer__contactIcon--style"
              href="mailto:contact@greenkode.net"
              target="_top"
            >
              contact@greenkode.net
            </a>
          </div>
        </div>
        <div className="footer__heading">
          <p className="footer__heading--style">"{props.message}"</p>
        </div>
        <div className="footer__socialMedia">
          <div className="footer__socialMedia--padding">
            <div className="circle">
              <a
                href="https://twitter.com/GreenKode_net"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
          <div className="footer__socialMedia--padding">
            <div className="circle">
              <a
                href="https://www.instagram.com/green_kode/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
          <div className="footer__socialMedia--padding">
            <div className="circle">
              <a
                href="https://www.linkedin.com/company/greenkode/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>{" "}
          <div className="footer__socialMedia--padding">
            <div className="circle">
              <a
                href="https://www.facebook.com/greenkodenet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Footer;
