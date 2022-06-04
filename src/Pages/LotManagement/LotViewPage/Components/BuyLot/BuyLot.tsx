import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Trans } from "react-i18next";

import CountdownTimer from "../../../../../Components/TimeCounter/CountdownTimer";
import { CreateAgreement } from "../../../../../Components/Types/Agreement";

import BadRequest from "../../../../../Components/Message/BadRequest";

import { DetailedLot } from "../../../../../Components/Types/Lot";
import CreateNewAgreementService from "../../Services/CreateNewAgreementService";

import style from "./BuyLotStyle.module.sass";
import { CreateBid } from "../../../../../Components/Types/Bid";
import PlaceBidService from "../../Services/PlaceBidService";

interface BuyLotProps {
  lotInfo: DetailedLot;
  remainingTime: string;
}

function BuyLot(props: BuyLotProps) {
  const [goodRequest, setGoodRequest] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });
  const [badRequest, setBadRequest] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const [showWindow, setShowWindow] = useState<{
    bid: boolean;
    buy: boolean;
  }>({ bid: false, buy: false });

  const [bid, setBid] = useState<CreateBid>({
    lotId: props.lotInfo.id,
    value: props.lotInfo.bids
      ? props.lotInfo.bids[props.lotInfo.bids.length - 1].value +
        props.lotInfo.minBidStep
      : props.lotInfo.minBidPrice,
  });

  const [expired, setExpired] = useState<boolean>(false);

  const [agreement, setAgreement] = useState<CreateAgreement>({
    lotId: props.lotInfo.id,
    description: "test description",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  });

  const BuyLot = () => {
    console.log(agreement);
    CreateNewAgreementService({ agreement: agreement });
  };

  const PlaceBid = () => {
    var res = PlaceBidService({ bid: bid });
    if (res) {
      setGoodRequest((prev) => ({
        ...prev,
        show: res,
        message: "bid created",
      }));
    } else {
      setBadRequest((prev) => ({
        ...prev,
        show: res,
        message: "something went wrong",
      }));
    }
    setShowWindow((prev) => ({ ...prev, bid: false }));
  };

  return (
    <div>
      <BadRequest show={badRequest.show} text={badRequest.message} />
      <BadRequest show={goodRequest.show} text={badRequest.message} />
      <Modal
        style={{ display: "flex", marginTop: "10%" }}
        show={showWindow.bid}
        getOpenState={(e: any) => {
          setShowWindow((prev) => ({ ...prev, bid: e }));
        }}
        tabIndex="-1"
      >
        <Modal.Header>
          <Modal.Title style={{ justifyContent: "center" }}>
            <div className={style.modal_header}>
              <p>
                <Trans i18nKey="LotViewBodyApproveBid">BodyApproveBid</Trans>
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={style.modal_text}>
            <Trans i18nKey="LotViewBodyApproveBidDescription">
              LotViewBodyApproveBidDescription
            </Trans>
          </p>
          <div>
            <p>
              {props.lotInfo.bids
                ? `Current bid winner is ${
                    props.lotInfo.bids[props.lotInfo.bids.length - 1].value
                  }$ your bid should be higher on ${props.lotInfo.minBidStep}$`
                : `Minimum bid: ${props.lotInfo.minBidPrice}$`}
            </p>

            <div
              className={style.bid_input_container}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>bid</label>
              <input
                className={style.input_style}
                type="number"
                min={
                  props.lotInfo.bids
                    ? props.lotInfo.bids[props.lotInfo.bids.length - 1].value
                    : props.lotInfo.minBidPrice
                }
                max="50000000000"
                id="flexCheckDefault"
                step={props.lotInfo.minBidStep}
                name="minBidPrice"
                value={bid.value}
                onChange={(e) => {
                  setBid((prev) => ({
                    ...prev,
                    value: Number(e.target.value),
                  }));
                }}
              />
              <small id="emailHelp" className="form-text text-muted">
                minimum bid price
              </small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              PlaceBid();
            }}
          >
            <Trans i18nKey="FooterContinue">FooterContinue</Trans>
          </Button>
          <div className="vr" />
          <Button
            variant="secondary"
            onClick={() => {
              setShowWindow((prev) => ({ ...prev, bid: false }));
            }}
          >
            <Trans i18nKey="FooterCancel">FooterCancel</Trans>
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.auction_text_style}>
        <label className={style.text_style}>
          {props.lotInfo.bids
            ? "Highest bid is " +
              props.lotInfo.bids[props.lotInfo.bids.length - 1].value
            : "Minimum bid: " + props.lotInfo.minBidPrice}
          {" or Buy it now for " + props.lotInfo.buyPrice}
        </label>
        <div>
          <label className={style.text_style}>Your Pick</label>

          <div className={style.auction_options_style}>
            <div className={style.bid_container}>
              <CountdownTimer
                targetDate={new Date(props.remainingTime)}
                setExpired={setExpired}
              />
              <label className={style.bids_count_style}>
                {props.lotInfo.bids
                  ? props.lotInfo.bids.length + ". bids"
                  : "0 bids"}
              </label>
            </div>
            <Button
              className={style.button_style}
              variant="primary"
              onClick={() => {
                setShowWindow((prev) => ({ ...prev, bid: true }));
              }}
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#2f6d31",
              }}
              disabled={expired ? true : false}
            >
              <Trans i18nKey="LotViewPlaceBid">PlaceBid</Trans>
            </Button>
            <Button
              className={style.button_style}
              variant="primary"
              onClick={BuyLot}
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#2f6d31",
              }}
              disabled={expired ? true : false}
            >
              <Trans i18nKey="LotViewBuyNow">BuyNow</Trans>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyLot;
