/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import dropin from "braintree-web-drop-in";
import Button from "react-bootstrap/Button";

import style from "./BraintreeDropInStyle.module.sass";
import GetPaymentToken from "../../Services/GetPaymentToken";
import CreatePaymentService from "../../Services/CreatePaymentService";
import { Trans } from "react-i18next";
import { CreatePayment } from "../../../Types/Payment";

interface BraintreeDropInProps {
  show: boolean;
  onPaymentCompleted: () => void;
  AgreementId: string;
  Price: number;
}

export default function BraintreeDropIn(props: BraintreeDropInProps) {
  const [braintreeInstance, setBraintreeInstance] = useState<any>(undefined);

  const [showPayButton, setShowPayButton] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    GetPaymentToken({ setToken: (arg: string) => setToken(arg) });
  }, []);

  useEffect(() => {
    if (token !== "") {
      const initializeBraintree = () =>
        dropin.create(
          {
            // insert your tokenization key or client token here
            authorization: token,
            container: "#braintree-drop-in-div",
          },
          function (error, instance) {
            if (error) console.error(error);
            else setBraintreeInstance(instance);
          }
        );

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
  }, [token]);

  return (
    <div style={{ display: `${props.show ? "block" : "none"}` }}>
      <div
        id={"braintree-drop-in-div"}
        className={style.braintree_drop_in_div}
      />

      <div className={style.pay_button_container}>
        {showPayButton && <Button
          disabled={!braintreeInstance}
          onClick={() => {
            if (braintreeInstance) {
              braintreeInstance.requestPaymentMethod(
                (error: any, payload: { nonce: any }) => {
                  if (error) {
                    console.error(error);
                  } else {
                    // console.log("payment method nonce", payload);
                    
                    const payment: CreatePayment = {
                      AgreementId: props.AgreementId,
                      Price: props.Price,
                      Nonce: payload.nonce
                    }
                    // TODO: use the paymentMethodNonce to
                    //  call you server and complete the payment here
                    var res = CreatePaymentService({ payment: payment });
                    // ...

                    if(res){
                      //show 
                    }
                    // alert(`Payment completed with nonce=${paymentMethodNonce}`);

                    props.onPaymentCompleted();
                  }
                }
              );
            }
            setShowPayButton(false);
          }}
        >
          <Trans i18nKey="PayForAgreement">PayForAgreement</Trans>
        </Button>}
      </div>
    </div>
  );
}
