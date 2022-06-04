import React, { useEffect, useState } from "react";
import { SimpleLot } from "../../Components/Types/Lot";
import LoadLotsService from "./Services/LoadLotsService";

import {
  Container,
  Col,
  Row,
  Button,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";

import "./StatisticsStyle.sass";
import ColumnChart from "./Components/ColumnChart";

interface IStatisticsProps {}

function StatisticsPage(props: IStatisticsProps) {
  const [dataLoading, setDataLoading] = useState({
    isLoading: true,
    requests: null,
    inProgress: null,
  });

  const [lots, setLots] = useState<SimpleLot[]>([]);

  useEffect(() => {
    LoadLotsService({
      selectedParams: { lotType: "All", sortType: "Default", state: "Default" },
      setLots: setLots,
      setDataLoading: setDataLoading,
    });
  }, []);

  return(

      <Container>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p><p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        <p style={{fontSize: "100px"}}>Statistics</p>
        
        {/* <ColumnChart lots={lots}/> */}
      </Container>
  );
}
export default StatisticsPage;
