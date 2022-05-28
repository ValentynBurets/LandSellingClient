import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "./Components/Layouts/Layout/Layout";

import StartPage from "./Pages/StartPage/StartPage";
import NewLot from "./Pages/LotManagement/NewLot/NewLot.js"
import AgreementPage from "./Pages/LotManagement/AgreementManagement/AgreementPage/AgreementPage"
import AgreementListPage from "./Pages/LotManagement/AgreementManagement/AgreementListPage/AgreementListPage"
import NewAgreementPage from "./Pages/LotManagement/AgreementManagement/NewAgreementPage/NewAgreementPage"
import MapComponent from "./Components/Map/MapComponent";
import Payment from "./Components/Payment/Payment"
import About from "./Pages/AboutPage/About"

import "bootstrap/dist/css/bootstrap.min.css";

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
            <li>
              <Link to="/map">MapComponent</Link>
            </li>
            <li>
              <Link to="/agreement">AgreementPage</Link>
            </li>
            <li>
              <Link to="/agreement-list">AgreementListPage</Link>
            </li>
            <li>
              <Link to="/new-agreement">NewAgreementPage</Link>
            </li>
            <li>
              <Link to="/payment">Payment</Link>
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
        <Route exact path="/map" component={MapComponent} />
        <Route exact path="/agreement" component={AgreementPage} />
        <Route exact path="/agreement-list" component={AgreementListPage} />
        <Route exact path="/new-agreement" component={NewAgreementPage} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/about" component={About} />
      </Layout>
    </Router>
  );
}

export default App;
