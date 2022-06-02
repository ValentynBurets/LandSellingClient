import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout } from "./Components/Layouts/Layout/Layout";

import StartPage from "./Pages/StartPage/StartPage";
import NewLot from "./Pages/LotManagement/NewLot/NewLot.js"
import LotList from "./Pages/LotManagement/LotListPage/LotList"
import LotView from "./Pages/LotManagement/LotViewPage/LotView"
import AgreementListPage from "./Pages/LotManagement/AgreementManagement/AgreementListPage/AgreementListPage"
import MapComponent from "./Components/Map/MapComponent";
import Payment from "./Components/Payment/Payment"
import About from "./Pages/AboutPage/About"
import UserListPage from "./Pages/UserListPage/UserListPage"

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
              <Link to="/user-list">UserListPage</Link>
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
            <li>
              <Link to="/lot-list">Lots List</Link>
            </li>
            <li>
              <Link to="/lot"> LotView</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Layout>
        {/* to add a new page just add a route here */}
        <Route exact path="/" component={StartPage} />
        <Route exact path="/index" component={StartPage} />
        <Route exact path="/index.html" component={StartPage} />
        <Route exact path="/home" component={LotList} />
        <Route exact path="/new-lot" component={NewLot} />
        <Route exact path="/lot-list" component={LotList} />
        <Route exact path="/lot" component={LotView} />
        <Route exact path="/lot/:id" component={LotView} />
        <Route exact path="/map" component={MapComponent} />
        <Route exact path="/agreement-list" component={AgreementListPage} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/about" component={About} />
        <Route exact path="/user-list" component={UserListPage} />
      </Layout>
    </Router>
  );
}

export default App;
