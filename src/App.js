import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";
import { Alert } from "./Components/Alert";
import { AlertState } from "./context/alert/AlertState";
import { GitHubState } from "./context/giHub/gitHubState";

function App() {
  return (
    <AlertState>
      <GitHubState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert text="Test alert" />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/profile/:name" component={Profile} />
            </Switch>
          </div>
        </BrowserRouter>
      </GitHubState>
    </AlertState>
  );
}

export default App;
