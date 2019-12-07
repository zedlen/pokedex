import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from "./pages/home";
import { NavBar } from "./components/navbar";
import PokemonDetail from "./pages/pokemon";

export default function App() {
    return (
      <Router>   
          <NavBar />      
          <Switch>            
            <Route exact path="/"> 
              <HomePage />
            </Route>
            <Route exact path="/pokemon/:name">
              <PokemonDetail />
            </Route>
          </Switch>        
      </Router>
    );
  }