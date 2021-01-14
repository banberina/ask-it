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
import NotRegisteredPage from "./pages/not-available/not-available.component";
import AskQuestionPage from "./pages/ask-question/ask-question.component";

import { ToastContainer } from "react-toastify";

import { checkToken } from "./utils/utils";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

/* Private routes - if the user is authenticated, render component; otherwise redirect to home page */
const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkToken() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkToken() === false ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/signup" component={RegistrationPage} />
          <PublicRoute path="/notregistered" component={NotRegisteredPage} />
          <Route path="/question/:questionId" component={QuestionPage} />
          <Route path="/profile/:userId" component={ProfilePage} />
          <UserRoute path="/askquestion" component={AskQuestionPage} />
          <UserRoute path="/myquestions/:userId" component={MyQuestionsPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
