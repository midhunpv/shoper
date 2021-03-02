import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import CreateAccount from "./shoper/createAccount";
import ShoperHome from "./shoper/shoperHome";
import LoginPage from "./loginPage";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/shoper/shoperhome" exact component={ShoperHome} />
            <Route
              path="/shoper/createaccount"
              exact
              component={CreateAccount}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
