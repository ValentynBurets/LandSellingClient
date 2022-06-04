/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Row, Modal, Button, Container, Table } from "react-bootstrap";

import style from "./PaymentStyle.module.sass";
import { Trans } from "react-i18next";
import BraintreeDropIn from "./Components/BraintreeDropIn/BraintreeDropIn";

interface PaymentProps {
  show: boolean;
  setShowPayment: (arg: boolean) => void;
  AgreementId: string;
  Price: number;
}

function Payment(props: PaymentProps) {
  return (
    <div>
      <Modal
        style={{ display: "flex", marginTop: "10%" }}
        show={props.show}
        // getOpenState={(e: any) => setDisApproveState(e)}
        tabIndex="-1"
      >
        <Modal.Header>
          <Modal.Title>
            <Trans i18nKey="Payment">Payment</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Trans i18nKey="PaymentDescription">You're agoing to make a payment for agreement</Trans>
          <BraintreeDropIn show={true} onPaymentCompleted={() => {}} AgreementId={props.AgreementId} Price={props.Price}/>
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
