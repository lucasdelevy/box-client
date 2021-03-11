import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Page/Home";
import LoginForm from "./components/AuthForm/LoginForm";
import RegistrationForm from "./components/AuthForm/RegistrationForm";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container d-flex align-items-center flex-column">
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/login" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/signup" exact={true}>
              <RegistrationForm />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
