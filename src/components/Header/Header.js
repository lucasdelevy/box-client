import React, { useState } from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";

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
    window.location.reload(false);
  };

  if (state.isAuthenticated) {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <div className="row col-12 d-flex justify-content-center text-white">
            <Button color="primary" variant="contained" href="/">
              Home
            </Button>
            <Button color="primary" variant="contained" onClick={doLogout}>
              Logout
            </Button>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <div className="row col-12 d-flex justify-content-center text-white">
            <Button color="primary" variant="contained" href="/">
              Home
            </Button>
            <Button color="primary" variant="contained" href="/login">
              Login
            </Button>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
