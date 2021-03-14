import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { getUserData } from "../../utils/GraphQLUtils";
import Header from "../Header/Header";

function Home(props) {
  const [state, setState] = useState({
    email: "",
    userId: "",
  });

  const cookies = new Cookies();
  const isAuthenticated = cookies.get("isAuthenticated");

  const fetchUserData = async (email, token) => {
    const userData = await getUserData(email, token);
    setState({ email: userData.email, userId: userData.userId });
  };

  if (isAuthenticated === "true") {
    const email = cookies.get("email");
    const token = cookies.get("token");

    if (state.userId === "") {
      fetchUserData(email, token);
      return <div />;
    } else {
      return (
        <div>
          <Header />
          <div className="container d-flex align-items-center flex-column">
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
              {state.userId} -{" "}
              {state.email.substring(0, state.email.lastIndexOf("@"))}
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
}
export default Home;
