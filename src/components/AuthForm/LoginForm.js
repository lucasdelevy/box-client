import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { confirmLogin } from "../../utils/GraphQLUtils";
import Cookies from "universal-cookie";
import Header from "../Header/Header";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    token: "",
    isAuthenticated: false,
  });

  const useStyles = makeStyles((theme) => ({
    margin: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    spacer: {
      marginBottom: theme.spacing(10),
    },
  }));
  const classes = useStyles();

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
      <div>
        <Header />
        <div className="container d-flex align-items-center flex-column">
          <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
              <div className="form-group text-left">
                <input
                  style={{ marginTop: "10px" }}
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="e-mail"
                  value={state.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-left">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              <div
                className={classes.margin}
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={handleSubmitClick}
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  href="/signup"
                >
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
