import React from "react";
import HomeContainer from "./containers/HomeContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignInComponent from "./components/user/SignInComponent";
import SignUpComponent from "./components/user/SignUpComponent";
import FooterComponent from "./components/core/FooterComponent";
import PrivacyPolicyComponent from "./components/core/PrivacyPolicyComponent";
import PrivateRoute from "./PrivateRoute";
import WarningComponent from "./components/generic/Warning";
import NoMatchComponent from "./components/generic/NoMatch";
import "./App.scss";
import RecruiterContainer from "./containers/RecruiterContainer";
import ProfileContainer from "./containers/ProfileContainer";
import { UserContext } from "./context";
import { getUserData } from "./helpers/helper";
import ViewProfileComponent from "./components/user/ViewProfileComponent";

const canAccess = (user, type = "jobseeker") => {
  return user && user.type && user.type === type;
};

class App extends React.Component {
  state = {
    user: getUserData(),
  };

  onStorageUpdate = () => {
    this.setState({ user: getUserData() });
  };

  componentDidMount() {
    if (typeof window != "undefined") {
      window.addEventListener("storage", this.onStorageUpdate);
    }
  }
  componentWillUnmount() {
    if (typeof window != "undefined") {
      window.removeEventListener("storage", this.onStorageUpdate, true);
    }
  }

  render() {
    return (
      <div>
        <UserContext.Provider
          value={{ user: this.state.user, updateUser: this.onStorageUpdate }}
        >
          <Router>
            <Switch>
              {/* Every One can access these */}
              <Route path="/" exact={true} component={HomeContainer} />
              <Route path="/home" exact={true} component={HomeContainer} />
              <Route path="/signIn" exact={true} component={SignInComponent} />
              <Route path="/signUp" exact={true} component={SignUpComponent} />
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
                    <HomeContainer
                      jobId={props.match.params.jobId}
                      {...props}
                    />
                  );
                }}
              />
              <Route
                path="/job/featured/:jobId"
                exact={true}
                render={(props) => {
                  return (
                    <HomeContainer
                      featuredJobId={props.match.params.jobId}
                      {...props}
                    />
                  );
                }}
              />
              <Route
                path="/viewProfile/:username"
                exact={true}
                render={(props) => {
                  return (
                    <ViewProfileComponent
                      username={props.match.params.username}
                    />
                  );
                }}
              />

              {/* Only Job Seeker can access these routes  */}
              <PrivateRoute
                condition={
                  canAccess(this.state.user) ||
                  canAccess(this.state.user, "recruiter")
                }
                path="/editProfile"
                component={<ProfileContainer editProfile />}
                redirectComponent={
                  <WarningComponent message="Only Signed-In user / Jobseeker can edit profile. Please login to view this Page" />
                }
                message="Only Signed-In user / Jobseeker can edit profile. Please login to view this Page"
              />
              <PrivateRoute
                condition={canAccess(this.state.user)}
                path="/profile"
                component={<ProfileContainer />}
                redirectComponent={
                  <WarningComponent message="Only Signed-In user / Jobseeker can view the profile. Please login as jobseeker to view this Page" />
                }
                message="Only Signed-In user / Jobseeker can view the profile. Please login as jobseeker to view this Page"
              />
              <PrivateRoute
                condition={canAccess(this.state.user)}
                path="/appliedJobs"
                component={<ProfileContainer showAppliedJobsOnly />}
                redirectComponent={
                  <WarningComponent message="Only Signed-In user / Jobseeker can view the applied jobs. Please login as jobseeker to view this Page" />
                }
                message="Only Signed-In user / Jobseeker can view the applied jobs. Please login as jobseeker to view this Page"
              />
              <Route
                path="/job/applied/:jobId"
                exact={true}
                render={(props) => {
                  return canAccess(this.state.user) ? (
                    <HomeContainer
                      applied
                      featuredJobId={props.match.params.jobId}
                      {...props}
                    />
                  ) : (
                    <WarningComponent message="Only Signed-In user / Jobseeker can view applied jobs. Please login as jobseeker to view this Page" />
                  );
                }}
              />

              {/* Only Recruiter can access these routes */}
              <PrivateRoute
                condition={canAccess(this.state.user, "recruiter")}
                path="/postJob"
                component={<RecruiterContainer postJob={true} />}
                redirectComponent={
                  <WarningComponent message="Only Recruiter can post the jobs. Please login as recruiter to view this Page" />
                }
                message="Only Recruiter can post the jobs. Please login as recruiter to view this Page"
              />
              <PrivateRoute
                condition={canAccess(this.state.user, "recruiter")}
                path="/recruiter"
                component={<RecruiterContainer />}
                redirectComponent={
                  <WarningComponent message="Only Recruiter can view this page. Please login as recruiter to view this Page" />
                }
                message="Only Recruiter can view this page. Please login as recruiter to view this Page"
              />
              <Route
                path="/job/posted/:jobId"
                exact={true}
                render={(props) => {
                  return canAccess(this.state.user, "recruiter") ? (
                    <RecruiterContainer
                      postedJobId={props.match.params.jobId}
                    />
                  ) : (
                    <WarningComponent message="Only Recruiter can view this page. Please login as recruiter to view this Page" />
                  );
                }}
              ></Route>

              <Route component={NoMatchComponent} />
            </Switch>
          </Router>
          <FooterComponent />
        </UserContext.Provider>
      </div>
    );
  }
}

App.contextType = UserContext;

export default App;
