import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import Spinner from "react-bootstrap/spinner";

import { SimpleLot } from "../../../Components/Types/Lot";
import LoadLotsService from "./Services/LoadLotsService";
import LotCardDeck from "../../../Components/LotCard/LotCardDeck/LotCardDeck";
import TextData from "../../../Assets/jsonData/TextData/LotList.json";

import style from "./LotListStyle.module.sass";

interface LotListProps {}

function LotList(props: LotListProps) {
  let history = useHistory();

  const [dataLoading, setDataLoading] = useState({
    isLoading: true,
    requests: null,
    inProgress: null,
  });

  const back = () => {
    history.push({
      pathname: "/home",
    });
  };

  const clearSortTypes = () => {
    setSelectedParam({
      lotType: "All",
      sortType: "Default",
      state: "Default",
    });
  };

  const [lots, setLots] = useState<SimpleLot[]>();

  const SortTypes: string[] = ["Default", "ByCostRaising", "ByСostDescending"];

  const LotTypes: string[] = ["All", "Rent", "Auction"];

  const States: string[] = ["Default", "Open", "Close"];

  const [selectedParams, setSelectedParam] = useState<{
    lotType: string;
    sortType: string;
    state: string;
  }>({
    lotType: "All",
    sortType: "Default",
    state: "Default",
  });

  const setSortTypeHandler = (value: any) => {
    setSelectedParam((prev) => ({
      ...prev,
      sortType: value,
    }));
  };

  const setLotTypeHandler = (value: any) => {
    setSelectedParam((prev) => ({
      ...prev,
      lotType: value,
    }));
  };

  const setStateHandler = (value: any) => {
    setSelectedParam((prev) => ({
      ...prev,
      state: value,
    }));
  };

  useEffect(() => {
    LoadLotsService({
      selectedParams: selectedParams,
      setLots: setLots,
      setDataLoading: setDataLoading,
    });
  }, [selectedParams]);

  return (
    <div className={style.lotlist_page_background}>
      <Container>
        {dataLoading.isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            <div className={style.present_col}>
              <div className={style.description}>
                <h1>LAND AND BUILDING</h1>
                <h5>Find your best offer for you with our service</h5>
              </div>
            </div>
            <Row className={style.lot_list_header_text}>
              <div>List of lots</div>
            </Row>

            <Row className={style.top_row_options_style}>
              <Col md="auto">
                <Row>
                  <Col>
                    <label className={style.sort_label_style}>
                      {TextData.SortType}
                    </label>
                    <DropdownButton
                      className={style.drop_down_button}
                      title={selectedParams.sortType}
                      onSelect={setSortTypeHandler}
                    >
                      {SortTypes.map((item, id) => (
                        <Dropdown.Item key={id} eventKey={item}>
                          {item}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </Col>
                  <Col style={{ width: "6rem" }}>
                    <label className={style.sort_label_style}>
                      {TextData.LotType}
                    </label>
                    <DropdownButton
                      className={style.drop_down_button}
                      title={selectedParams.lotType}
                      onSelect={setLotTypeHandler}
                    >
                      {LotTypes.map((item, id) => (
                        <Dropdown.Item key={id} eventKey={item}>
                          {item}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </Col>
                  <Col>
                    <label className={style.sort_label_style}>
                      {TextData.StateType}
                    </label>
                    <DropdownButton
                      className={style.drop_down_button}
                      title={selectedParams.state}
                      onSelect={setStateHandler}
                    >
                      {States.map((item, id) => (
                        <Dropdown.Item key={id} eventKey={item}>
                          {item}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </Col>
                  <Col style={{ display: "flex", justifyContent: "bottom" }}>
                    <Button
                      style={{
                        width: "5rem",
                        height: "2.5rem",
                        marginTop: "1.5rem",
                      }}
                      variant="primary"
                      onClick={clearSortTypes}
                    >
                      {TextData.Clear}
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md={7} className={style.top_row_back_button}>
                <Button
                  style={{
                    width: "5rem",
                    height: "2.5rem",
                    marginTop: "1.5rem",
                  }}
                  variant="primary"
                  onClick={back}
                >
                  {TextData.Back}
                </Button>
              </Col>
            </Row>
            <Col>{lots && <LotCardDeck lots={lots} />}</Col>
          </Container>
        )}
      </Container>
    </div>
  );
}

export default LotList;
