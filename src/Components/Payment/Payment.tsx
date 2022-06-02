import React, { useState, useEffect, useRef } from "react";

import style from "./AgreementPage.module.sass";
import GetPaymentToken from "./Services/GetPaymentToken";
import ConnectionConfig from "../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";
import axios from "axios";

interface PaymentProps {}

export default function Payment(props: PaymentProps){
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    GetPaymentToken({ setToken: (arg: string) => setToken(arg) });
  }, []);

  var client = require("braintree-web-drop-in");

  // client.create({
  //   authorization: token
  // }, function (err: any, clientInstance: any) {
  //   hostedFields.create(/* ... */);
  // });

  const onPaymentClick = () => {
    client.create(
      {
        authorization: token,
        container: "#dropin-container",
        googlePay: {
          googlePayVersion: 2,
          merchantId: "merchant-id-from-google",
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: "123.45",
            currencyCode: "USD",
          },
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                // We recommend collecting and passing billing address information with all Google Pay transactions as a best practice.
                billingAddressRequired: true,
                billingAddressParameters: {
                  format: "FULL",
                },
              },
            },
          ],
        },
      },
      function (
        err: any,
        instance: {
          requestPaymentMethod: (
            arg0: (requestPaymentMethodErr: any, payload: any) => void
          ) => void;
        }
      ) {

        if (err) {
          // Handle any errors that might've occurred when creating Drop-in
          console.error(err);
          return;
        }


        instance.requestPaymentMethod(function (
          requestPaymentMethodErr: any,
          payload: any
        ) {
          axios
            .post(
              `${
                ConnectionConfig.ServerUrl +
                ConnectionConfig.Routes.Payment.CreatePayment
              }`,
              payload,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((responce) => {
              var data = responce.data;
              console.log(data);
            })
            .catch((e) => {
              console.log(e);
              alert(e);
            });
        });
      }
    );
  };

    return (
      <div>
        <button style={{width: "100px", height : "50px"}} onClick={onPaymentClick} />
      </div>
    );
  
}
