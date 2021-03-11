import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { confirmLogin } from "../../utils/GraphQLUtils";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
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

    const { authenticated } = await confirmLogin(
      state.email,
      state.password
    );

    setState({ ...state, isAuthenticated: authenticated });
  };

  if (state.isAuthenticated) {
      console.log("state.email");
      console.log(state.email);
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { isAuthenticated: true, username: state.email },
        }}
      />
    );
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
