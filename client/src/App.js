import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NavBar from "./components/navbar/navbar.component";
import Homepage from "./pages/home/home.component";
import LoginPage from "./pages/login/login.component";
import RegistrationPage from "./pages/registration/registration.component";
import QuestionPage from "./pages/individual-question /individual-question.component";
import ProfilePage from "./pages/profile/profile.component";
import MyQuestionsPage from "./pages/my-questions/my-questions.component";
import NotFoundPage from "./pages/404/not-found.component";

import { ToastContainer } from "react-toastify";

import { hasValidJwt } from "./utils/jwtValidator";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* Private routes - if the user is authenticated, render component; otherwise redirect to home page */
const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      hasValidJwt() === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
      <NavBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegistrationPage} />
          <UserRoute
            exact
            path="/question/:questionId"
            component={QuestionPage}
          />
          <UserRoute exact path="/profile/:userId" component={ProfilePage} />
          <UserRoute exact path="/my/:userId" component={MyQuestionsPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
