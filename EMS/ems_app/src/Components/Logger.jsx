import React from "react";
import { Link } from "react-router-dom";
import "../Css/Logger.css";

function Logger() {
  return (
    <>
      <div className="mainContainer">
        <div className="loginSection">
          <Link to="LoginPage">
            <div id="admin"></div>
          </Link>
          <Link to="LoginPage">
            <div id="user"></div>
          </Link>
        </div>

        {/* TEXT */}
        <div className="loginText">
          <Link to="LoginPage">
            <div className="adminText">
              <span id="adminText">ADMIN</span>
            </div>
          </Link>
          <Link to="LoginPage">
            <div className="userText">
              <span>USER</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Logger;
