import React from "react"

import axios from "axios";
import { DetailedLot } from "../../../../Components/Types/Lot";
import ConnectionConfig from "../../../../Assets/jsonData/ConnectionConfig/ConnectionConfig.json";

interface ILoadAllLotInfoServiceProps{
  setLotInfo: (arg: DetailedLot[]) => void;
}

function LoadAllLotInfoService(props: ILoadAllLotInfoServiceProps){

  axios
    .get(
      `${
        ConnectionConfig.ServerUrl +
        ConnectionConfig.Routes.Lot.GetAll
      }`
    )
    .then((responce) => {
      var data = responce.data;
      //console.log(data)
      if (data != null) {
        props.setLotInfo(data);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

export default LoadAllLotInfoService