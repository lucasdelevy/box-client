import React, { useState } from "react";
import Cookies from "universal-cookie";

function Header() {
  const [state, setState] = useState({
    isAuthenticated: false,
    readCookies: false,
  });

  const cookies = new Cookies();
  if (!state.readCookies) {
    setState({
      isAuthenticated: cookies.get("isAuthenticated") === "true",
      readCookies: true,
    });
  }

  const doLogout = () => {
    cookies.set("email", "");
    cookies.set("isAuthenticated", "false");
    cookies.set("token", "");
    setState({ isAuthenticated: false });
  };

  if (state.isAuthenticated) {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <div className="row col-12 d-flex justify-content-center text-white">
            {/* <span className="h3">Sign-in</span> */}
            <a style={{ color: "white" }} href="/">
              Home
            </a>
            <a
              style={{ color: "white", paddingLeft: "20px" }}
              onClick={doLogout}
              href=""
            >
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
