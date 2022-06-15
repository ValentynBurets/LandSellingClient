import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import { Trans } from "react-i18next";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/spinner";

import saveLot from "./Services/SaveLot";
import savePriceCoef from "./Services/SavePriceCoef";
import SaveImages from "./Services/SaveImages";

import UploadImage from "./Component/UploadImage/UploadImage";
import MapComponent from "../../../Components/Map/MapComponent";
import LinkConfig from "../../../Assets/jsonData/LinkConfig/LinkConfig.json";
import { MapContextProvider } from "../../../Components/Map/useMapContext";
import Tbody from "./Component/PriceCoefTable/Tbody";
import TheaderList from "./Component/PriceCoefTable/TheaderList";
import GoodRequest from "../../../Components/Message/GoodRequest";

import style from "./NewLot.module.sass";

export default function NewLot() {
  let history = useHistory();

  const [goodRequest, setGoodRequest] = useState({
    show: false,
    message: "",
  });

  const [dataStatus, saveDataStatus] = useState({
    isLoading: false,
    requests: null,
    inProgress: null,
  });

  const [lotId, setLotId] = useState(null);

  useEffect(() => {
    console.log("lotId, ", lotId);
  }, [lotId]);

  const [lotData, setLotData] = useState({
    header: "",
    description: "",
    buyPrice: 100,
    isRent: false,
    isAuction: false,
    minBidPrice: 100,
    minBidStep: 100,
    auctionDuration: 1,
    location: {
      latitude: 0,
      longitude: 0,
      country: "",
      region: "",
      city: "",
      street: "",
      house: "",
    },
  });

  const handleSetLocationFunction = (value) => {
    setLotData((prev) => ({ ...prev, location: value }));
  };

  const handleSetLocation = useCallback((value) => {
    handleSetLocationFunction(value);
  }, []);

  const handleInputChangeFunction = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setLotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangeLocation = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setLotData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleInputChange = useCallback((value) => {
    handleInputChangeFunction(value);
  }, []);

  const handleCheckChangeFunction = (event) => {
    const { name, checked } = event.target;
    setLotData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCheckChange = useCallback((value) => {
    handleCheckChangeFunction(value);
  }, []);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date();
  let date = today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016

  const newLot = () => {
    saveDataStatus((prev) => ({
      ...prev,
      isLoading: true,
      requests: true,
      inProgress: true,
    }));

    if (lotData.location.country === "" || lotData.location.city === "") {
      alert("Please enter the location");

      saveDataStatus((prev) => ({
        ...prev,
        isLoading: false,
        requests: false,
        inProgress: false,
      }));

      return;
    }

    saveLot(lotData, setLotId, saveDataStatus);

    saveDataStatus((prev) => ({
      ...prev,
      isLoading: false,
      requests: false,
      inProgress: false,
    }));

    setGoodRequest((prev) => ({
      ...prev,
      show: true,
      message: "new lot created. You can see it on lot list page",
    }));
  };

  useEffect(() => {
    if (lotId !== null) {
      if (lotData.isRent) {
        savePriceCoef(priceCoefs, lotId, saveDataStatus);
      }

      SaveImages(lotPictures, lotId);

      history.push({
        pathname: LinkConfig.lot_management.lot_list,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotId]);

  const [newPriceCoef, setNewPriceCoef] = useState({
    id: 1,
    monthCount: 1,
    value: 1,
  });

  const daysClickHandler = (v) => {
    setNewPriceCoef({
      id: newPriceCoef.id,
      monthCount: v,
      value: newPriceCoef.value,
    });
  };
  const costClickHandler = (v) => {
    setNewPriceCoef({
      id: newPriceCoef.id,
      monthCount: newPriceCoef.monthCount,
      value: v,
    });
  };

  const [priceCoefs, setPriceCoefs] = useState([]);

  const addNewPriceCoef = () => {
    setNewPriceCoef({
      id: newPriceCoef.id + 1,
      monthCount: newPriceCoef.monthCount,
      value: newPriceCoef.value,
    });
    const PriceCoef = {
      id: newPriceCoef.id,
      monthCount: newPriceCoef.monthCount,
      value: newPriceCoef.value,
    };

    setPriceCoefs((prev) => [...prev, PriceCoef]);
  };

  const RemovePriceCoef = (arg) => {
    let tempArray = [];

    priceCoefs.forEach((element) => {
      if (element.id !== arg) {
        tempArray.push(element);
      }
    });

    setPriceCoefs(tempArray);
  };

  const [lotPictures, addLotPicture] = useState([]);

  return (
    <div className={style.newLot_page_background}>
      <GoodRequest show={goodRequest.show} text={goodRequest.message} />
      {dataStatus.isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container className={style.wrapper_style}>
          {/* Header row */}
          <div>
            <div className={style.header_text}>
              <Trans i18nKey="NewLot">new lot</Trans>
            </div>
          </div>
          {/* Image donwnload and set main properties */}
          <Row>
            <Col className={style.container_style}>
              <UploadImage
                lotPictures={lotPictures}
                addLotPictureToArr={(value) => {
                  addLotPicture((prevState) => [...prevState, value]);
                }}
              />
            </Col>
            <Col
              className={style.form_inputs_style}
              style={{ justifyContent: "left" }}
            >
              <Row></Row>
              <Row>
                <Col>
                  <label className={style.date_style}>{"Date: " + date}</label>
                  <div className={style.text_input}>
                    <label>
                      <Trans i18nKey="LotHeader">Lot header</Trans>
                    </label>
                    <input
                      type="header"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="headerHelp"
                      placeholder="Enter header"
                      name="header"
                      value={lotData.header}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      <Trans i18nKey="EnterLotHeader">
                        Enter header text. This text will be on the top of the
                        your lot.
                      </Trans>
                    </small>
                  </div>
                </Col>
              </Row>

              <div className={style.check_box_style}>
                <Row>
                  <Col style={{ width: "25rem" }}>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        name="isRent"
                        checked={lotData.isRent}
                        onChange={(e) => {
                          handleCheckChange(e);
                        }}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        <Trans i18nKey="AllowRent">allow rent</Trans>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        name="isAuction"
                        checked={lotData.isAuction}
                        onChange={(e) => {
                          handleCheckChange(e);
                        }}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        <Trans i18nKey="AllowAuction">allow auction</Trans>
                      </label>
                    </div>
                  </Col>

                  <Col>
                    {lotData.isAuction && (
                      <div style={{ marginTop: "-35px" }}>
                        <div
                          className={style.text_input}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label>
                            <Trans i18nKey="MinBid">Min bid</Trans>
                          </label>
                          <input
                            className={style.input_style}
                            type="number"
                            min="100"
                            max="50000000000"
                            id="flexCheckDefault"
                            step="100"
                            name="minBidPrice"
                            value={lotData.minBidPrice}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          <small id="emailHelp" class="form-text text-muted">
                            <Trans i18nKey="MinimumBidPrice">
                              minimum bid price
                            </Trans>
                          </small>
                        </div>
                        <div
                          className={style.text_input}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Trans i18nKey="BidStep">bid step</Trans>
                          <input
                            className={style.input_style}
                            type="number"
                            min="100"
                            max="50000000000"
                            id="flexCheckDefault"
                            step="100"
                            name="minBidStep"
                            value={lotData.minBidStep}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          <small id="emailHelp" class="form-text text-muted">
                            <Trans i18nKey="MinimumBidStep">
                              minimum bid step
                            </Trans>
                          </small>
                        </div>
                        <div
                          className={style.text_input}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label>
                            <Trans i18nKey="AuctionDuration">
                              Auction Duration
                            </Trans>
                          </label>
                          <input
                            className={style.input_style}
                            type="number"
                            min="1"
                            max="100"
                            id="flexCheckDefault"
                            step="1"
                            name="auctionDuration"
                            value={lotData.auctionDuration}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                          />
                          <small id="emailHelp" class="form-text text-muted">
                            <Trans i18nKey="SetAuctionDuration">
                              Set Auction Duration
                            </Trans>
                          </small>
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col>
                    {lotData.isAuction && (
                      <div
                        className={style.text_input}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <label>
                          <Trans i18nKey="BuyPrice">Buy Price</Trans>
                        </label>
                        <input
                          className={style.input_style}
                          type="number"
                          min="100"
                          max="50000000000"
                          id="flexCheckDefault"
                          step="100"
                          name="buyPrice"
                          value={lotData.buyPrice}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                        <small id="emailHelp" class="form-text text-muted">
                          Enter buy price
                        </small>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            {lotData.isRent && (
              <Col className={style.container_style}>
                <Container>
                  <Row className="HeaderText">
                    <Trans i18nKey="PriceCoefs">price coefs</Trans>
                  </Row>
                  <Row>
                    <div className={style.price_coefs_style}>
                      {priceCoefs && priceCoefs.length > 0 && (
                        <Table responsive>
                          <TheaderList />
                          <Tbody
                            bodyData={priceCoefs}
                            RemovePriceCoef={(arg) => {
                              RemovePriceCoef(arg);
                            }}
                          />
                        </Table>
                      )}
                    </div>
                  </Row>
                  <Row>
                    <Col>
                      <InputGroup className="form-control">
                        <InputGroup.Text>
                          {" "}
                          <Trans i18nKey="Months">Months</Trans>
                        </InputGroup.Text>
                        <FormControl
                          onChange={(e) => daysClickHandler(e.target.value)}
                          type="number"
                          min="1"
                          max="100"
                          aria-label="Months (Dyration for rent)"
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="form-control">
                        <InputGroup.Text>
                          <Trans i18nKey="Cost">Cost</Trans>
                        </InputGroup.Text>
                        <FormControl
                          onChange={(e) => costClickHandler(e.target.value)}
                          type="number"
                          min="1"
                          max="10000"
                          step="100"
                          aria-label="Cost (Cost of rent dyring this period)"
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <Button variant="primary" onClick={addNewPriceCoef}>
                        <Trans i18nKey="AddPriceCoef">Add price coef</Trans>
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            )}
          </Row>
          {/* description */}
          <Row>
            <Col className={style.container_style}>
              <div className={style.description_col_style}>
                <label>
                  <Trans i18nKey="Description">Description</Trans>
                </label>
                <textarea
                  className={style.description_area_style}
                  name="description"
                  value={lotData.description}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={style.container_style}>
              <div className={style.map_col_style}>
                <MapContextProvider>
                  <MapComponent
                    isNewLot={true}
                    handleSetLocation={handleSetLocation}
                    lotLocation={lotData.location}
                    center={{
                      lat: lotData.location.latitude,
                      lng: lotData.location.longitude,
                    }}
                  />
                </MapContextProvider>
              </div>
            </Col>
            <Col className={style.text_input_col}>
              <div className={style.text_input}>
                <label>
                  <Trans i18nKey="Country">Country</Trans>
                </label>
                <input
                  type="header"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="headerHelp"
                  placeholder="Enter Country"
                  name="country"
                  value={lotData.location.country}
                  onChange={(e) => {
                    handleInputChangeLocation(e);
                  }}
                />
                <small id="emailHelp" class="form-text text-muted">
                  <Trans i18nKey="EnterCountry">Enter Country</Trans>
                </small>
              </div>
              <div className={style.text_input}>
                <label>
                  <Trans i18nKey="Region">Region</Trans>
                </label>
                <input
                  type="header"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="headerHelp"
                  placeholder="Enter region"
                  name="region"
                  value={lotData.location.region}
                  onChange={(e) => {
                    handleInputChangeLocation(e);
                  }}
                />
                <small id="emailHelp" class="form-text text-muted">
                  <Trans i18nKey="EnterRegion">Enter region</Trans>
                </small>
              </div>
              <div className={style.text_input}>
                <label>
                  <Trans i18nKey="City">City</Trans>
                </label>
                <input
                  type="header"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="headerHelp"
                  placeholder="Enter region"
                  name="city"
                  value={lotData.location.city}
                  onChange={(e) => {
                    handleInputChangeLocation(e);
                  }}
                />
                <small id="emailHelp" class="form-text text-muted">
                  <Trans i18nKey="EnterCity">EnterCity</Trans>
                </small>
              </div>
              <div className={style.text_input}>
                <label>
                  <Trans i18nKey="Street">Street</Trans>
                </label>
                <input
                  type="header"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="headerHelp"
                  placeholder="Enter street"
                  name="street"
                  value={lotData.location.street}
                  onChange={(e) => {
                    handleInputChangeLocation(e);
                  }}
                />
                <small id="emailHelp" class="form-text text-muted">
                  <Trans i18nKey="EnterStreet">EnterStreet</Trans>
                </small>
              </div>
              <div className={style.text_input}>
                <label>
                  <Trans i18nKey="House">House</Trans>
                </label>
                <input
                  type="header"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="headerHelp"
                  placeholder="Enter house number"
                  name="house"
                  value={lotData.location.house}
                  onChange={(e) => {
                    handleInputChangeLocation(e);
                  }}
                />
                <small id="emailHelp" class="form-text text-muted">
                  <label>
                    <Trans i18nKey="EnterHouse">EnterHouse</Trans>
                  </label>
                </small>
              </div>
              <div className={style.text_input}>
                <label>
                  <Trans i18nKey="Latitude">Latitude</Trans>
                </label>
                <input
                  type="header"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="headerHelp"
                  placeholder="Enter house number"
                  name="latitude"
                  value={lotData.location.latitude}
                  disabled
                />
                <small id="emailHelp" class="form-text text-muted">
                  <Trans i18nKey="EnterLatitude">Enter Latitude</Trans>
                </small>
              </div>
              <div className={style.text_input}>
                <label>
                  <Trans i18nKey="Longitude">Longitude</Trans>
                </label>
                <input
                  type="header"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="headerHelp"
                  placeholder="Enter house number"
                  name="longitude"
                  value={lotData.location.longitude}
                  disabled
                />
                <small id="emailHelp" class="form-text text-muted">
                  <Trans i18nKey="EnterLongitude">Enter Longitude</Trans>
                </small>
              </div>
            </Col>
          </Row>
          <Row className={style.save_row_style}>
            <Col className={style.container_style}>
              <Button
                className={style.lot_button}
                variant="primary"
                onClick={newLot}
                style={{ backgroundColor: "#4CAF50", borderColor: "#2f6d31" }}
              >
                <Trans i18nKey="LotViewCreate">
                  Save changes and create a new lot
                </Trans>
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
