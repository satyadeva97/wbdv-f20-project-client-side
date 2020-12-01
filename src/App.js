import logo from "./logo.svg";
import "./App.scss";
import HomeContainer from "./containers/HomeContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignInComponent from "./components/SignInComponent";
import SignUpComponent from "./components/SignUpComponent";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileComponent from "./components/ProfileComponent";
import FooterComponent from "./components/FooterComponent";
import PrivacyPolicyComponent from "./components/PrivacyPolicyComponent";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact={true} component={HomeContainer} />
        <Route path="/home" exact={true} component={HomeContainer} />

        <Route path="/signIn" exact={true} component={SignInComponent} />
        <Route path="/signUp" exact={true} component={SignUpComponent} />
        <Route path="/profile" exact={true} component={ProfileComponent} />
        <Route
          path="/privacy"
          exact={true}
          component={PrivacyPolicyComponent}
        />
        <Route
          path="/search/keyword/:keyword/location/:location"
          exact={true}
          render={(props) => {
            return (
              <HomeContainer
                search={{
                  keyword: props.match.params.keyword,
                  location: props.match.params.location,
                }}
                {...props}
              />
            );
          }}
        />
      </Router>
      <FooterComponent />
    </div>
  );
}

export default App;
