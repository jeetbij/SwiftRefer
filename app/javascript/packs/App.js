import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupForm from "./components/account/SignupForm";
import LoginForm from "./components/account/LoginForm";
import HomePage from "./components/HomePage";
import { getTokenData } from "./store";

function RequireAuth({ children }) {
  const token = getTokenData();
  let authed =
    (token === undefined || token === null || token === "" || token === "null")
      ? false
      : true;

  return authed === true ? children : <Navigate to="/" replace />;
}

function NoAuth({ children }) {
  const token = getTokenData();
  let authed =
    (token === undefined || token === null || token === "" || token === "null")
      ? false
      : true;

  return authed === true ? <Navigate to="/homepage" replace /> : children ;
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>

          <Route path="/sign_up" element={
            <NoAuth>
              <SignupForm />
            </NoAuth>
          } />

          <Route path="/" element={
            <NoAuth>
              <LoginForm />
            </NoAuth>
          } />

          <Route
            path="/homepage"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
