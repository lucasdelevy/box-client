import React from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  if (location.state && location.state.isAuthenticated) {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <div className="row col-12 d-flex justify-content-center text-white">
            {/* <span className="h3">Sign-in</span> */}
            <a style={{ color: "white" }} href="/">
              Home
            </a>
            <a style={{ color: "white", paddingLeft: "20px" }} href="/logout">
              Logout
            </a>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <div className="row col-12 d-flex justify-content-center text-white">
            {/* <span className="h3">Sign-in</span> */}
            <a style={{ color: "white" }} href="/">
              Home
            </a>
            <a style={{ color: "white", paddingLeft: "20px" }} href="/login">
              Login
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
