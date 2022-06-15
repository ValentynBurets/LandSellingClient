import React, { useState, useEffect } from "react";
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
import { Trans } from "react-i18next";

import style from "./LotListStyle.module.sass";

interface LotListProps {}

function LotList(props: LotListProps) {

  const [dataLoading, setDataLoading] = useState({
    isLoading: true,
    requests: null,
    inProgress: null,
  });

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
                <h1>
                  <Trans i18nKey="LandBuilding">LAND AND BUILDING</Trans>
                </h1>
                <h5>
                  <Trans i18nKey="BestOffer">
                    Find your best offer for you with our service
                  </Trans>
                </h5>
              </div>
            </div>
            <Row className={style.lot_list_header_text}>
              <div>
                <Trans i18nKey="LotsList">List of lots</Trans>
              </div>
            </Row>

            <div className={style.top_row_options_style}>
              <div className={style.sort_col_style}>
                <label className={style.sort_label_style}>
                  <Trans i18nKey="SortType">sort type</Trans>
                </label>
                <DropdownButton
                  style={{ width: "100px" }}
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
              </div>
              <div>
                <label className={style.sort_label_style}>
                  <Trans i18nKey="LotType">lot type</Trans>
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
              </div>
              <div>
                <label className={style.sort_label_style}>
                  <Trans i18nKey="StateType">state type</Trans>
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
              </div>
              <div>
                <Button
                  style={{
                    marginTop: "1.5rem",
                  }}
                  variant="primary"
                  onClick={clearSortTypes}
                >
                  <Trans i18nKey="Clear">clear</Trans>
                </Button>
              </div>
            </div>
            <Col>{lots && <LotCardDeck lots={lots} />}</Col>
          </Container>
        )}
      </Container>
    </div>
  );
}

export default LotList;
