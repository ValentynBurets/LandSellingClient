/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/spinner";
import { Container, Col, Row } from "react-bootstrap";

import { Trans } from "react-i18next";

import LoadDetailLotInfoService from "./Services/LoadDetailLotInfoService";
import UpdateLotViewsService from "./Services/UpdateLotViewsService";
import LoadImagesService from "../../../Components/LotCard/LotCard/Service/LoadImagesService";
import { LotImage } from "../../../Components/Types/LotImage";
import { DetailedLot } from "../../../Components/Types/Lot";
import { PriceCoef } from "../../../Components/Types/PriceCoef";
import { Bid } from "../../../Components/Types/Bid";

import LotImageCarousel from "../../../Components/Image/ImageCarousel/LotImageCarousel";
import MapComponent from "../../../Components/Map/MapComponent";

import AuctionLot from "./Components/BuyLot/BuyLot";
import RentLot from "./Components/RentLot/RentLot";

import LoadBidsService from "./Services/LoadBidsService";
import LoadPriceCoefService from "./Services/LoadPriceCoefService";

import style from "./LotView.module.sass";
import { RequestResult } from "../../../Components/Types/RequestResult";
import BadRequest from "../../../Components/Message/BadRequest";
import GoodRequest from "../../../Components/Message/GoodRequest";

interface LotViewProps {}

function LotView(props: LotViewProps) {
  const [goodRequest, setGoodRequest] = useState<RequestResult>({
    show: false,
    message: "",
  });
  const [badRequest, setBadRequest] = useState<RequestResult>({
    show: false,
    message: "",
  });

  const params: { id: string } = useParams();

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
    minBidStep: 0,
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

  return (
    <div className={style.lotview_page_background}>
      <BadRequest show={badRequest.show} text={badRequest.message} />
      <GoodRequest show={goodRequest.show} text={goodRequest.message} />
      <Container>
        {dataLoading.isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            {/* Header row */}
            <div>
              <div className={style.header_text}>
                <Trans i18nKey="LotViewHeader">lot</Trans>
              </div>
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
                  <Trans i18nKey="Publicated">Publicated: </Trans> {date}
                </label>
                <label className={style.text_header}>{lotInfo.header}</label>
                {lotInfo.isAuction && (
                  <AuctionLot
                    setGoodRequest={setGoodRequest}
                    setBadRequest={setBadRequest}
                    lotInfo={lotInfo}
                    remainingTime={remainingTime}
                  />
                )}
                {lotInfo.isRent && (
                  <RentLot
                    setGoodRequest={setGoodRequest}
                    setBadRequest={setBadRequest}
                    lotInfo={lotInfo}
                  />
                )}
              </Col>
            </Row>
            {/* description */}
            <Row>
              <Col className={style.container_style}>
                <div className={style.description_col_style}>
                  <label>
                    <Trans i18nKey="LotViewDescription">Description</Trans>
                  </label>
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
                  <label>
                    <Trans i18nKey="LotViewCountry">Country</Trans>
                  </label>
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
                  <label>
                    <Trans i18nKey="LotViewRegion">Region</Trans>
                  </label>
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
                  <label>
                    <Trans i18nKey="LotViewCity">City</Trans>
                  </label>
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
                  <label>
                    <Trans i18nKey="LotViewStreet">Street</Trans>
                  </label>
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
                  <label>
                    <Trans i18nKey="LotViewHouse">House</Trans>
                  </label>
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
                <label>
                  <Trans i18nKey="LotViewViews">Views</Trans>
                  {lotInfo.views}
                </label>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </div>
  );
}

export default LotView;
