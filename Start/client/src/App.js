import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Routing from "./components/routing/Routing";

let logUser;
if (localStorage.token) {
  const jwt = localStorage.getItem("token");
  logUser = jwtDecode(jwt);
}
const App = () => {
  // When user state is Null = user not logged in
  const [user, setUser] = useState(logUser);

  //   console.log(user);

  return (
    <Router>
      <div className="app">
        <Navbar user={user} />
        <div className="main">
          <Routing />
        </div>
      </div>
    </Router>
  );
};

export default App;
