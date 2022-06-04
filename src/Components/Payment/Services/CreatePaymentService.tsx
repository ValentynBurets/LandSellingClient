import React from "react";

import ConnectionConfig from '../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json'
import axios from 'axios'
import { CreatePayment } from "../../Types/Payment";

interface CreatePaymentServiceProps{
  payment: CreatePayment;
}

function CreatePaymentService(props: CreatePaymentServiceProps): boolean{
  let token = localStorage.getItem("token");

  axios
  .post(
    `${
      ConnectionConfig.ServerUrl +
      ConnectionConfig.Routes.Payment.CreatePayment
    }`,
    props.payment,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  .then((responce) => {
    var data = responce.data;
    return true;
  })
  .catch((e) => {
    console.log(e);
    alert(e);
  });
  return true;
}

export default CreatePaymentService