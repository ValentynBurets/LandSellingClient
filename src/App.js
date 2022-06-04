import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Layout } from "./Components/Layouts/Layout/Layout";
import NewLot from "./Pages/LotManagement/NewLot/NewLot.js"
import LotList from "./Pages/LotManagement/LotListPage/LotList"
import LotView from "./Pages/LotManagement/LotViewPage/LotView"
import AgreementListPage from "./Pages/LotManagement/AgreementManagement/AgreementListPage/AgreementListPage"
import PaymentList from "./Pages/LotManagement/AgreementManagement/PaymentList/PaymentList"
import About from "./Pages/AboutPage/About"
import UserListPage from "./Pages/UserListPage/UserListPage"
import StatisticsPage from "./Pages/StatisticsPage/StatisticsPage"

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
              <Link to="/user-list">UserListPage</Link>
            </li>
            <li>
              <Link to="/new-lot">CrateNewLot</Link>
            </li>
            <li>
              <Link to="/agreement-list">AgreementListPage</Link>
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
            <li>
              <Link to="/statistics-page"> Statistics</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Layout>
        {/* to add a new page just add a route here */}
        {/* <Route path="/" component={LotList} /> */}
        <Route path="/index" component={LotList} />
        <Route path="/index.html" component={LotList} />
        <Route path="/new-lot" component={NewLot} />
        <Route path="/lot-list" component={LotList} />
        <Route path="/lot" component={LotView} />
        <Route path="/lot/:id" component={LotView} />
        <Route path="/" componenet={StatisticsPage} />
        <Route path="/payments" componenet={PaymentList} />
        <Route path="/payments/:i" componenet={PaymentList} />
        <Route path="/agreement-list" component={AgreementListPage} />
        <Route path="/about" component={About} />
        <Route path="/user-list" component={UserListPage} />
      </Layout>
    </Router>
  );
}

export default App;
