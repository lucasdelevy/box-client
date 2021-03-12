import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { confirmLogin } from "../../utils/GraphQLUtils";
import Cookies from "universal-cookie";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    token: "",
    isAuthenticated: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    const { authenticated, token } = await confirmLogin(
      state.email,
      state.password
    );
    console.log({ authenticated, token });

    if (authenticated) {
      setState({ ...state, isAuthenticated: true, token });
    } else {
      setState({ ...state, isAuthenticated: false });
    }
  };

  if (state.isAuthenticated) {
    const cookies = new Cookies();
    cookies.set("isAuthenticated", true, { path: "/" });
    cookies.set("email", state.email, { path: "/" });
    cookies.set("token", state.token, { path: "/" });

    return <Redirect to="/" />;
  } else {
    return (
      <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <form>
          <div className="form-group text-left">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={state.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmitClick}
          >
            Sign in
          </button>
        </form>
        <NavLink
          to="/signup"
          id="signUp"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Sign up
        </NavLink>
      </div>
    );
  }
}

export default LoginForm;
