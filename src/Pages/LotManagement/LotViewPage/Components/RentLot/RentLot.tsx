import React, { useState } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import moment from "moment";
import Datetime from "react-datetime";

import TheaderList from "../Table/TheaderList";
import Tbody from "../Table/Tbody";
import { Trans } from "react-i18next";

import { CreateAgreement } from "../../../../../Components/Types/Agreement";
import CreateNewAgreementService from "../../Services/CreateNewAgreementService";
import SelectPriceCoefService from "../../Services/SelectPriceCoefService";
import { DetailedLot } from "../../../../../Components/Types/Lot";
import BadRequest from "../../../../../Components/Message/BadRequest";

import style from "./RentLotStyle.module.sass";

interface RentLotProps {
  lotInfo: DetailedLot;
}

function RentLot(props: RentLotProps) {
  const [badRequest, setBadRequest] = useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: "",
  });

  const [agreement, setAgreement] = useState<CreateAgreement>({
    lotId: props.lotInfo.id,
    description: "test description",
    startDate: new Date("2022-08-01T11:55:03.030Z").toISOString(),
    endDate: new Date("2022-12-06T11:55:03.030Z").toISOString(),
  });

  const [showRentWindow, setShowRentWindow] = useState<boolean>(false);
  const [selectedPriceCoefIdState, setSelectedPriceCoefIdState] =
    useState<string>("");

  const RentLot = () => {
    selectedPriceCoefIdState !== undefined &&
      SelectPriceCoefService({ priceCoefId: selectedPriceCoefIdState });

    console.log(agreement);
    CreateNewAgreementService({ agreement: agreement });
  };

  return (
    <div>
      <BadRequest show={badRequest.show} text={badRequest.message} />
      <Modal
        style={{ display: "flex", marginTop: "10%" }}
        show={showRentWindow}
        getOpenState={(e: any) => setShowRentWindow(e)}
        tabIndex="-1"
      >
        <Modal.Header>
          <Modal.Title style={{ justifyContent: "center" }}>
            <div className={style.modal_header}>
              <p>
                <Trans i18nKey="LotViewApproveRent">Approve rent</Trans>
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={style.modal_text}>
            <Trans i18nKey="LotViewBodyApprove">BodyApprove</Trans>
          </p>
          <div className={style.date_style}>
            <div className={style.date_picker_style}>
              <Trans i18nKey="LotViewBodyStartDate">StartDate</Trans>
              <Datetime
                value={moment(agreement.startDate).format("DD MM YYYY")}
                onChange={(value: any) => {
                  setAgreement((prev) => ({
                    ...prev,
                    startDate: value.format(),
                  }));
                }}
              />
            </div>
            <div className={style.date_picker_style}>
              <Trans i18nKey="LotViewBodyEndDate">EndDate</Trans>
              <Datetime
                value={moment(agreement.endDate).format("DD MM YYYY")}
                onChange={(value: any) => {
                  setAgreement((prev) => ({
                    ...prev,
                    endDate: value.format(),
                  }));
                }}
              />
            </div>
          </div>
          <div className={style.description_col_style}>
            <label>
              <Trans i18nKey="LotViewDescription">Description</Trans>
            </label>
            <textarea
              className={style.description_area_style}
              name="description"
              value={agreement.description}
              onChange={(e: any) => {
                setAgreement((prev) => ({
                  ...prev,
                  description: e.value,
                }));
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              RentLot();
              setShowRentWindow(!showRentWindow);
            }}
          >
            <Trans i18nKey="FooterContinue">FooterContinue</Trans>
          </Button>
          <div className="vr" />
          <Button
            variant="secondary"
            onClick={() => {
              setShowRentWindow(!showRentWindow);
            }}
          >
            <Trans i18nKey="FooterCancel">FooterCancel</Trans>
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.price_coefs_style}>
        <Table responsive>
          <TheaderList />
          <Tbody
            bodyData={props.lotInfo.priceCoefs}
            setSelectedPriceCoefIdState={(arg: string) =>
              setSelectedPriceCoefIdState(arg)
            }
          />
        </Table>
      </div>
      <div className={style.rent_button_container}>
        <Button
          className={style.button_style}
          variant="primary"
          onClick={() => {
            if (selectedPriceCoefIdState === "") {
              setBadRequest({
                show: true,
                message: "select Price Coef "
              })
            }
            setShowRentWindow(true);
          }}
          style={{
            backgroundColor: "#4CAF50",
            borderColor: "#2f6d31",
          }}
          disabled={selectedPriceCoefIdState === "" ? true : false}
        >
          <Trans i18nKey="LotViewRentNow">RentNow</Trans>
        </Button>
      </div>
    </div>
  );
}

export default RentLot;
