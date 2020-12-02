import "./App.scss";
import HomeContainer from "./containers/HomeContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignInComponent from "./components/user/SignInComponent";
import SignUpComponent from "./components/user/SignUpComponent";
import React from "react";
import ProfileComponent from "./components/user/ProfileComponent";
import FooterComponent from "./components/core/FooterComponent";
import PrivacyPolicyComponent from "./components/core/PrivacyPolicyComponent";

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
        <Route
          path="/job/:jobId"
          exact={true}
          render={(props) => {
            return (
              <HomeContainer jobId={props.match.params.jobId} {...props} />
            );
          }}
        />
      </Router>
      <FooterComponent />
    </div>
  );
}

export default App;
