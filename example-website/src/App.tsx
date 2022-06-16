// --- Imports ---

import React from "react"; //{,FC }

// Load css
import "./App.css";

// Load routes
import { Home } from "./modules/home";
import { PrivacyPolicy } from "./modules/footer/privacy";
import { Imprint } from "./modules/footer/imprint";
import { Status404 } from "./modules/status/404";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./img/akudui-OhMfc8ADMd0-unsplash.jpg";

// Load packages
import dotenv from "dotenv";

// --- Setup ---

dotenv
  .config
  //{ path: './config/.env' }
  ();

// --- App ---
class App extends React.Component {
  render() {
    console.log(
      "Example BTC Public Key with a few transactions: 3HwXz83FvEbR1pDEwENKHmccYyR6YxMg78\n",
    );
    console.log(
      "Example BTC Public Key with many transactions: 1JvXhnHCi6XqcanvrZJ5s2Qiv4tsmm2UMy",
    );
    console.log(
      "Example BTC Public Key with unbelievably many transactions: 37biYvTEcBVMoR1NGkPTGvHUuLTrzcLpiv"
    )

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/privacy">
              <PrivacyPolicy />
            </Route>
            <Route path="/imprint">
              <Imprint />
            </Route>
            <Route path="*">
              <Status404 />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
