/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Modal, Button } from "react-bootstrap";

import { Trans } from "react-i18next";
import { RequestResult } from "../Types/RequestResult";
import BraintreeDropIn from "./Components/BraintreeDropIn/BraintreeDropIn";

interface PaymentProps {
  show: boolean;
  setShowPayment: (arg: boolean) => void;
  AgreementId: string;
  Price: number;
  setGoodRequest: (arg: RequestResult) => void;
  setBadRequest: (arg: RequestResult) => void;
}

function Payment(props: PaymentProps) {
  return (
    <div>
      <Modal
        style={{ display: "flex", marginTop: "10%" }}
        show={props.show}
        tabIndex="-1"
      >
        <Modal.Header>
          <Modal.Title>
            <Trans i18nKey="Payment">Payment</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Trans i18nKey="PaymentDescription">
            You're agoing to make a payment for agreement
          </Trans>
          <BraintreeDropIn
            setGoodRequest={props.setGoodRequest}
            setBadRequest={props.setBadRequest}
            show={true}
            onPaymentCompleted={props.setShowPayment}
            AgreementId={props.AgreementId}
            Price={props.Price}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="vr" />
          <Button
            variant="secondary"
            onClick={() => {
              props.setShowPayment(!props.show);
            }}
          >
            <Trans i18nKey="FooterCancel">FooterCancel</Trans>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Payment;
