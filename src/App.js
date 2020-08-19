import React from 'react';
import Header from './components/Header/Header';
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container d-flex align-items-center flex-column">
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;