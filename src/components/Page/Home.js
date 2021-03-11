import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

function Home(props) {
  const [state, setState] = useState({
    isAuthenticated: false,
    username: "",
    locationExtracted: false,
  });

  const location = useLocation();
  if (
    location.state &&
    location.state.isAuthenticated &&
    !state.locationExtracted
  ) {
    setState({
      isAuthenticated: location.state.isAuthenticated,
      username: location.state.username,
      locationExtracted: true,
    });
  }

  if (state.isAuthenticated) {
    return (
      <div>{state.username.substring(0, state.username.lastIndexOf("@"))}</div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}
export default Home;
