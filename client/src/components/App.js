import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./layout";
import { Home } from './Home';
import { Products } from './products';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/products" component={Products} />
      </Switch>
    </Router>
  );
}

export default App;
