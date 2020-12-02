import React from "react";
import HomeContainer from "./containers/HomeContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInComponent from "./components/user/SignInComponent";
import SignUpComponent from "./components/user/SignUpComponent";
import ProfileComponent from "./components/user/ProfileComponent";
import FooterComponent from "./components/core/FooterComponent";
import PrivacyPolicyComponent from "./components/core/PrivacyPolicyComponent";
import PrivateRoute from "./PrivateRoute";
import WarningComponent from "./components/Warning";
import NoMatchComponent from "./components/NoMatch";
import "./App.scss";
import RecruiterContainer from "./containers/RecruiterContainer";

function App() {
  return (
    <div>
      <Router>
        <Switch>
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
          <PrivateRoute
            condition={true}
            path="/postJob"
            component={<RecruiterContainer postJob={true} />}
            redirectComponent={
              <WarningComponent message="Only recruiter can post the jobs. Please login as recruiter to view this Page" />
            }
            message="Only recruiter can post the jobs. Please login as recruiter to view this Page"
          />
          <PrivateRoute
            condition={false}
            path="/recruiter"
            component={<RecruiterContainer />}
            redirectComponent={
              <WarningComponent message="Only recruiter can post the jobs. Please login as recruiter to view this Page" />
            }
            message="Only recruiter can post the jobs. Please login as recruiter to view this Page"
          />

          <Route component={NoMatchComponent} />
        </Switch>
      </Router>
      <FooterComponent />
    </div>
  );
}

export default App;
