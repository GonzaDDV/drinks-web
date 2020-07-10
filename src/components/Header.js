import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import Drinks from "./Drinks";
import Home from "./Home";
import AddDrinks from "./AddDrinks";

const Header = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/tragos">Ver tragos</Link>
        <Link to="/agregar-trago">Agregar trago</Link>
      </nav>

      <Switch>
        <Route path="/tragos">
          <Drinks />
        </Route>
        <Route path="/agregar-trago">
          <AddDrinks />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Header;
