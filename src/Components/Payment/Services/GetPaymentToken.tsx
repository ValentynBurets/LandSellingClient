import React, { useState, useEffect, useRef } from "react";
import ConnectionConfig from '../../../Assets/jsonData/ConnectionConfig.json'

import axios from 'axios'

interface GetPaymentTokenProps{
  setToken: (arg: string) => void
} 

function GetPaymentToken(props: GetPaymentTokenProps): void{

  axios
    .get(`${ConnectionConfig.ServerUrl + ConnectionConfig.Routes.Payment.GetPaymentToken}`)
    .then((responce) => {
      var data = responce.data
      //console.log(data)
      if (data != null) {
        props.setToken(data)
      }
    })
    .catch((e) => {
      props.setToken("")
      console.log(e)
    }
  )
}

export default GetPaymentToken