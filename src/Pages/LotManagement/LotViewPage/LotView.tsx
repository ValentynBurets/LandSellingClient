/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/spinner";
import { Container, Col, Row, Button } from "react-bootstrap";

// import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import LoadDetailLotInfoService from "./Services/LoadDetailLotInfoService";

import { DetailedLot } from "../../../Components/Types/Lot/Lot";
import UpdateLotViewsService from "./Services/UpdateLotViewsService";
import LoadImagesService from "../../../Components/LotCard/LotCard/Service/LoadImagesService";
import { LotImage } from "../../../Components/Types/LotImage";
import TextData from "../../../Assets/jsonData/TextData/LotView.json";

import style from "./LotView.module.sass";
import LotImageCarousel from "../../../Components/Image/ImageCarousel/LotImageCarousel";
import LoadPriceCoefService from "./Services/LoadPriceCoefService";
import { PriceCoef } from "../../../Components/Types/PriceCoef";
import MapComponent from "../../../Components/Map/MapComponent";
import LoadBidsService from "./Services/LoadBidsService";
import { Bid } from "../../../Components/Types/Bid";
import CountdownTimer from "../../../Components/TimeCounter/CountdownTimer";
import LinkConfig from "../../../Assets/jsonData/LinkConfig/LinkConfig.json";
import { CreateAgreement } from "../../../Components/Types/Agreement";
import CreateNewAgreementService from "./Services/CreateNewAgreementService";

interface LotViewProps {}

function LotView(props: LotViewProps) {
  const params: { id: string } = useParams();
  let history = useHistory();

  const [date, setDateFunction] = useState<string>();
  const [remainingTime, setRemainingTime] = useState<string>("");
  const setDate = useCallback((arg: string) => {
    setDateFunction(arg);
  }, []);

  let lotInitialState = {
    id: "",
    ownerId: "",
    status: "",
    header: "",
    description: "",
    views: 0,
    publicationDate: "",
    buyPrice: 0,
    minBidPrice: 0,
    auctionDuration: 0,
    isRent: false,
    isAuction: false,
    location: {
      latitude: 0,
      longitude: 0,
      country: "",
      region: "",
      city: "",
      street: "",
      house: "",
    },
    ownerInfo: {
      Name: "",
      Surname: "",
      Role: "",
      Email: "",
      PhoneNumber: "",
    },
    images: [],
    priceCoefs: [],
    bids: [],
  };

  const [priceCoef, setPriceCoef] = useState<PriceCoef[]>([]);

  const [lot, setLot] = useState<DetailedLot>(lotInitialState);

  const [lotInfo, setLotInfo] = useState<DetailedLot>(lotInitialState);

  const [agreement, setAgreement] = useState<CreateAgreement>({
    lotId: "",
    description: "test description",
    startDate: new Date("2022-08-01T11:55:03.030Z").toISOString(),
    endDate: new Date("2022-12-06T11:55:03.030Z").toISOString(),
  });

  const [dataLoading, setDataLoading] = useState({
    isLoading: true,
    requests: null,
    inProgress: null,
  });

  useEffect(() => {
    LoadDetailLotInfoService({
      lotId: params.id,
      setLotInfo: setLot,
      setDataLoading: setDataLoading,
    });
  }, []);

  useEffect(() => {
    if (lot.id !== "") {
      setLotInfo(lot);
      UpdateLotViewsService({ lotId: lot.id });

      LoadImagesService({
        lotId: lot.id,
        setImageArray: (arg: LotImage[]) => {
          setLotInfo((prev) => ({ ...prev, images: arg }));
        },
      });

      if (lot.isRent === true) {
        LoadPriceCoefService({
          lotId: lot.id,
          setPriceCoef: setPriceCoef,
        });
      }
      if (lot.isAuction === true) {
        LoadBidsService({
          lotId: lot.id,
          setBids: (arg: Bid[]) => {
            setLotInfo((prev) => ({ ...prev, bids: arg }));
          },
        });
      }
    }
    setAgreement((prev) => ({ ...prev, lotId: lot.id }));

    setDataLoading((prev: any) => ({
      ...prev,
      isLoading: false,
      requests: false,
      inProgress: false,
    }));
  }, [lot]);

  useEffect(() => {
    let tempArray: PriceCoef[] = [];
    for (let i = 0; i < priceCoef.length; i++) {
      let item: PriceCoef = priceCoef[i];
      item.number = i + 1;
      tempArray.push(item);
    }
    setLotInfo((prev) => ({ ...prev, priceCoefs: tempArray }));
  }, [priceCoef]);

  useEffect(() => {
    if (lotInfo.publicationDate) {
      setDate(new Date(lotInfo.publicationDate).toDateString());

      let tempTime = new Date(lotInfo.publicationDate);
      tempTime.setDate(tempTime.getDate() + lotInfo.auctionDuration);
      setRemainingTime(tempTime.toISOString());
    }

    console.log("lotInfo", lotInfo);
  }, [lotInfo.publicationDate]);

  const BuyLot = () => {
    console.log(agreement)
    CreateNewAgreementService({agreement: agreement});
  };

  const PlaceBid = () => {
    history.push({
      pathname: LinkConfig.lot_management.agreement.new_agreement,
      state: { lotId: `${lotInfo.id}` },
    });
  };

  return (
    <div className={style.lotview_page_background}>
      <Container>
        {dataLoading.isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            {/* Header row */}
            <div>
              <div className={style.header_text}>{TextData.Header}</div>
            </div>
            {/* Image donwnload and set main properties */}
            <Row>
              <Col className={style.container_style}>
                <div className={style.center_image_carusel}>
                  <LotImageCarousel imgArray={lotInfo.images} />
                </div>
              </Col>
              <Col className={style.lot_info_column}>
                <label
                  style={{ justifyContent: "right" }}
                  className={style.date_style}
                >
                  {"Publicated: " + date}
                </label>
                <label className={style.text_header}>{lotInfo.header}</label>
                {lotInfo.isAuction && (
                  <div className={style.auction_text_style}>
                    <label className={style.text_style}>
                      {lotInfo.bids
                        ? "Highest bid is " + lotInfo.bids[lotInfo.bids.length]
                        : "Minimum bid: " + lotInfo.minBidPrice}
                      {" or Buy it now for " + lotInfo.buyPrice}
                    </label>
                    <div>
                      <label className={style.text_style}>Your Pick</label>

                      <div className={style.auction_options_style}>
                        <div className={style.bid_container}>
                          <CountdownTimer
                            targetDate={new Date(remainingTime)}
                          />
                          <label className={style.bids_count_style}>
                            {lotInfo.bids
                              ? lotInfo.bids.length + ". bids"
                              : "0 bids"}
                          </label>
                        </div>
                        <Button
                          className={style.button_style}
                          variant="primary"
                          onClick={PlaceBid}
                          style={{
                            backgroundColor: "#4CAF50",
                            borderColor: "#2f6d31",
                          }}
                        >
                          {TextData.PlaceBid}
                        </Button>
                        <Button
                          className={style.button_style}
                          variant="primary"
                          onClick={BuyLot}
                          style={{
                            backgroundColor: "#4CAF50",
                            borderColor: "#2f6d31",
                          }}
                        >
                          {TextData.BuyNow}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {lotInfo.isRent && (
                  <div className={style.price_coefs_style}>
                    {/* <BootstrapTable
                      data={lotInfo.priceCoefs}
                      bodyStyle={{ border: "none" }}
                      tableStyle={{ border: "none" }}
                      headerStyle={{ border: "none !important" }}
                      version="4"
                    >
                      <TableHeaderColumn width="150" isKey dataField="number">
                        Id
                      </TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="daysCount">
                        Months
                      </TableHeaderColumn>
                      <TableHeaderColumn width="150" dataField="value">
                        Cost
                      </TableHeaderColumn>
                    </BootstrapTable> */}
                  </div>
                )}
              </Col>
            </Row>
            {/* description */}
            <Row>
              <Col className={style.container_style}>
                <div className={style.description_col_style}>
                  <label>{TextData.Description}</label>
                  <textarea
                    className={style.description_area_style}
                    name="description"
                    value={lotInfo.description}
                    disabled
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className={style.container_style}>
                <MapComponent
                  isNewLot={false}
                  lotLocation={lotInfo.location}
                  handleSetLocation={() => {}}
                  center={{
                    lat: Number(lotInfo.location.latitude),
                    lng: Number(lotInfo.location.longitude),
                  }}
                />
              </Col>
              <Col className={style.text_input_col}>
                <div className={style.text_input}>
                  <label>Country</label>
                  <input
                    type="header"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="headerHelp"
                    placeholder="Country"
                    name="country"
                    value={lotInfo.location.country}
                    disabled
                  />
                </div>
                <div className={style.text_input}>
                  <label>Region</label>
                  <input
                    type="header"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="headerHelp"
                    placeholder="region"
                    name="region"
                    value={lotInfo.location.region}
                    disabled
                  />
                </div>
                <div className={style.text_input}>
                  <label>City</label>
                  <input
                    type="header"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="headerHelp"
                    placeholder="city"
                    name="city"
                    value={lotInfo.location.city}
                    disabled
                  />
                </div>
                <div className={style.text_input}>
                  <label>Street</label>
                  <input
                    type="header"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="headerHelp"
                    placeholder="street"
                    name="street"
                    value={lotInfo.location.street}
                    disabled
                  />
                </div>
                <div className={style.text_input}>
                  <label>House</label>
                  <input
                    type="header"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="headerHelp"
                    placeholder="house number"
                    name="house"
                    value={lotInfo.location.house}
                    disabled
                  />
                </div>
              </Col>
            </Row>
            <Row className={style.save_row_style}>
              <Col className={style.container_style}>
                <label>Views: {lotInfo.views}</label>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </div>
  );
}

export default LotView;
