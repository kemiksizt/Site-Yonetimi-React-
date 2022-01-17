import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Apartments from "./components/Apartments/Apartments";
import Bills from "./components/Bills/Bills";
import Users from "./components/Users/Users";
import Header from "./components/Header";
import MyBills from "./components/Bills/MyBills";
import Login from "./components/Login";

function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/apartments" component={Apartments} />
        <Route path="/bills" component={Bills} />
        <Route path="/users" component={Users} />
        <Route path="/mybills" component={MyBills} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
