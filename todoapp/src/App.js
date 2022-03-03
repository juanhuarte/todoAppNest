import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import Home from "./components/Home/Home";

function App() {
  const { authToken } = useSelector((state) => state);
  return (
    <div className="App">
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
    </div>
  );
}

export default App;
