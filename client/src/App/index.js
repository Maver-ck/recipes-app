import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { RecipesList, RecipesInsert, RecipesUpdate } from "../pages";

import { NavBar } from "../components";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/recipes/list" exact component={RecipesList} />
        <Route path="/recipes/create" exact component={RecipesInsert} />
        <Route path="/recipes/update/:id" exact component={RecipesUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
