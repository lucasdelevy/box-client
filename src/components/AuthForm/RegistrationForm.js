import React, { useState } from "react";
import { saveLogin } from "../../utils/GraphQLUtils";
import Header from "../Header/Header";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

function RegistrationForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const history = useHistory();

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    console.log(state.password);
    console.log(state.confirmPassword);

    if (state.password === state.confirmPassword) {
      console.log("Sending information to server...");
      await signUpAndLogIn(state.email, state.password);
    } else {
      console.log("Error: different passwords");
      // props.showError('Passwords should be the same!')
    }
  };

  const signUpAndLogIn = async (email, password) => {
    const res = await saveLogin(email, password);

    if (res.couldSave) {
      const cookies = new Cookies();
      cookies.set("isAuthenticated", true, { path: "/" });
      cookies.set("email", email, { path: "/" });
      cookies.set("token", res.token, { path: "/" });

      history.push("/");
    }
  };

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
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
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
            <div className="form-group text-left">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="confirm Password"
                value={state.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px"
              }}
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={handleSubmitClick}
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
export default RegistrationForm;
