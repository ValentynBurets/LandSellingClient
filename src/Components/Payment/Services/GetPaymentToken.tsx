import React from "react";

import ConnectionConfig from "../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

import axios from "axios";

interface GetPaymentTokenProps {
  setToken: (arg: string) => void;
}

function GetPaymentToken(props: GetPaymentTokenProps): void {
  let token = localStorage.getItem("token");

  axios
    .get(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.Payment.GetPaymentToken
      }`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        props.setToken(data);
      }
    })
    .catch((e) => {
      props.setToken("");
      console.log(e);
    });
}

export default GetPaymentToken;
