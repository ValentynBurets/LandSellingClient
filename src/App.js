import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Layout } from "./Components/Layouts/Layout/Layout";
import StartPage from "./Pages/StartPage/StartPage";
import "bootstrap/dist/css/bootstrap.min.css";
import NewLot from "./Pages/LotManagement/NewLot"

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/autorization">AutorizationPage</Link>
            </li>
            <li>
              <Link to="/user-list-page">UserListPage</Link>
            </li>
            <li>
              <Link to="/new-lot">CrateNewLot</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Layout>
        {/* to add a new page just add a route here */}
        <Route exact path="/" component={StartPage} />
        <Route exact path="/index" component={StartPage} />
        <Route exact path="/index.html" component={StartPage} />
        <Route exact path="/new-lot" component={NewLot} />
      </Layout>
    </Router>
  );
}


export default App;
