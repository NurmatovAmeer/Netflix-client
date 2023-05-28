import { Telegram,Twitter,Instagram,Facebook,LinkedIn } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";

const Footer = () => {
  return (
     <div className="footer">
         <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <span>Link us</span>
          <Telegram className="icon"/>
          <Twitter className="icon"/>
          <Instagram className="icon"/>
          <Facebook className="icon"/>
          <LinkedIn className="icon"/>
          <span>FAQ</span>
          <span>Help</span>
          <span>Settings</span>
          <span>For developers</span>
        </div>
        <div className="right">
          <span>&copy; Clover Softrware Prod.</span>
        </div>
      </div>
     </div>
  );
};

export default Footer;
